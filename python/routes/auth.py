from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models.user import UserCreate, UserLogin, UserUpdate
from config import database, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
import bcrypt
import jwt
from datetime import datetime, timedelta
from bson import ObjectId

router = APIRouter()
auth_scheme = HTTPBearer()
collection = database["users"]

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await collection.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "full_name": user.get("full_name", ""),
        "role": user.get("role", "admin"),
        "created_at": user["created_at"].isoformat(),
    }

@router.post("/signup")
async def signup(user: UserCreate, current_user: dict = Depends(get_current_user)):
    existing = await collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = user.dict()
    user_dict["hashed_password"] = hash_password(user.password)
    del user_dict["password"]
    user_dict["created_at"] = datetime.utcnow()
    result = await collection.insert_one(user_dict)
    new_user = await collection.find_one({"_id": result.inserted_id})
    return user_helper(new_user)

# LOGIN
@router.post("/login")
async def login(user: UserLogin):
    db_user = await collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    access_token = create_access_token({"sub": str(db_user["_id"])})
    return {"access_token": access_token, "token_type": "bearer", "user": user_helper(db_user)}

# PROFILE (get current)
@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    return user_helper(current_user)

# UPDATE PROFILE
@router.put("/profile")
async def update_profile(update: UserUpdate, current_user: dict = Depends(get_current_user)):
    update_data = update.dict(exclude_unset=True)
    if "password" in update_data and update_data["password"]:
        update_data["hashed_password"] = hash_password(update_data["password"])
        del update_data["password"]
    if update_data:
        await collection.update_one({"_id": current_user["_id"]}, {"$set": update_data})
    updated = await collection.find_one({"_id": current_user["_id"]})
    return user_helper(updated)

# LIST ALL USERS (admin only)
@router.get("/users")
async def list_users(current_user: dict = Depends(get_current_user)):
    users = await collection.find().to_list(100)
    return [user_helper(u) for u in users]







# DELETE a user (admin only)
@router.delete("/users/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_user)):
    if str(current_user["_id"]) == user_id:
        raise HTTPException(status_code=400, detail="You cannot delete your own account")
    result = await collection.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count:
        return {"message": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")