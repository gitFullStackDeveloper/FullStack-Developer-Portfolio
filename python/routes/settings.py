from fastapi import APIRouter, HTTPException
from config import database
from models.settings import Settings

router = APIRouter()
collection = database["settings"]

@router.get("/")
async def get_settings():
    doc = await collection.find_one({"_id": "global"})
    if not doc:
        default = Settings().dict()
        default["_id"] = "global"
        await collection.insert_one(default)
        doc = await collection.find_one({"_id": "global"})
    doc["id"] = doc.pop("_id")  
    return doc

@router.put("/")
async def update_settings(settings: Settings):
    data = settings.dict()
    await collection.update_one(
        {"_id": "global"},
        {"$set": data},
        upsert=True
    )
    return {"message": "Settings updated"}