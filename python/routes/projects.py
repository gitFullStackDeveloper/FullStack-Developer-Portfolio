
from fastapi import APIRouter, HTTPException, Query, Response
from models.project import Project
from config import database
from bson import ObjectId
from datetime import datetime

router = APIRouter()
collection = database["projects"]

LIST_FIELDS = {
    "_id": 1, "title": 1, "type": 1, "category": 1, "image": 1,
    "tech": 1, "desc": 1, "description": 1, "featured": 1, "badge": 1,
    "price": 1, "originalPrice": 1, "isForSale": 1, "showPrice": 1,
    "hidden": 1, "created_at": 1, "updated_at": 1,
}

DETAIL_FIELDS = {**LIST_FIELDS, "images": 1, "liveLink": 1, "codeLink": 1,
                 "techStack": 1, "features": 1, "includes": 1, "faqs": 1}


def project_helper(project) -> dict:
    return {
        "id": str(project["_id"]),
        "title": project["title"],
        "type": project.get("type", ""),
        "category": project.get("category", ""),
        "image": project.get("image", ""),
        "images": project.get("images", []),
        "tech": project.get("tech", []),
        "desc": project.get("desc", ""),
        "liveLink": project.get("liveLink", ""),
        "codeLink": project.get("codeLink", ""),
        "featured": project.get("featured", False),
        "badge": project.get("badge", ""),
        "price": project.get("price", ""),
        "originalPrice": project.get("originalPrice", ""),
        "techStack": project.get("techStack", []),
        "features": project.get("features", []),
        "includes": project.get("includes", []),
        "faqs": project.get("faqs", []),
        "description": project.get("description", ""),
        "created_at": project["created_at"].isoformat(),
        "updated_at": project["updated_at"].isoformat(),
        "isForSale": project.get("isForSale", True),
        "showPrice": project.get("showPrice", True),
        "hidden": project.get("hidden", False),
    }


@router.get("/")
async def get_projects(
    response: Response,
    include_hidden: bool = Query(False),
):
    query = {} if include_hidden else {"hidden": {"$ne": True}}
    cursor = (
        collection.find(query, LIST_FIELDS)
        .sort("created_at", -1)
        .allow_disk_use(True)   # ✅ bypass 32MB sort limit
    )
    projects = await cursor.to_list(200)
    response.headers["Cache-Control"] = "public, max-age=60, stale-while-revalidate=300"
    return [project_helper(p) for p in projects]


@router.get("/admin/full")
async def get_projects_admin():
    cursor = (
        collection.find({})                  
        .sort("created_at", -1)
        .allow_disk_use(True)                
    )
    projects = await cursor.to_list(500)
    return [project_helper(p) for p in projects]


@router.get("/{project_id}")
async def get_project(project_id: str):
    project = await collection.find_one(
        {"_id": ObjectId(project_id)}, DETAIL_FIELDS
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project_helper(project)


@router.post("/")
async def create_project(project: Project):
    new_project = await collection.insert_one(project.dict())
    created = await collection.find_one({"_id": new_project.inserted_id})
    return project_helper(created)


@router.put("/{project_id}")
async def update_project(project_id: str, project: Project):
    try:
        data = project.dict()
        data.pop("id", None)
        data.pop("_id", None)
        data["updated_at"] = datetime.utcnow()
        await collection.update_one({"_id": ObjectId(project_id)}, {"$set": data})
        updated = await collection.find_one({"_id": ObjectId(project_id)})
        if updated:
            return project_helper(updated)
        raise HTTPException(status_code=404, detail="Project not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{project_id}")
async def delete_project(project_id: str):
    result = await collection.delete_one({"_id": ObjectId(project_id)})
    if result.deleted_count:
        return {"message": "Project deleted"}
    raise HTTPException(status_code=404, detail="Project not found")


@router.patch("/{project_id}/toggle-hidden")
async def toggle_hidden(project_id: str):
    project = await collection.find_one({"_id": ObjectId(project_id)})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    new_hidden = not project.get("hidden", False)
    await collection.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": {"hidden": new_hidden, "updated_at": datetime.utcnow()}},
    )
    updated = await collection.find_one({"_id": ObjectId(project_id)})
    return project_helper(updated)