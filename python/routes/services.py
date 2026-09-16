
from fastapi import APIRouter, HTTPException, Response
from models.service import Service
from config import database
from bson import ObjectId
from datetime import datetime

router = APIRouter()
collection = database["services"]

LIST_FIELDS = {
    "_id": 1, "title": 1, "subtitle": 1, "description": 1, "category": 1,
    "icon": 1, "image": 1, "tags": 1, "slug": 1, "created_at": 1, "updated_at": 1,
}

DETAIL_FIELDS = {**LIST_FIELDS, "images": 1, "overview": 1, "features": 1,
                 "techStack": 1, "process": 1}


def service_helper(service) -> dict:
    return {
        "id": str(service["_id"]),
        "title": service.get("title", ""),
        "subtitle": service.get("subtitle", ""),
        "overview": service.get("overview", ""),
        "description": service.get("description", ""),
        "category": service.get("category", ""),
        "icon": service.get("icon", ""),
        "image": service.get("image", ""),
        "images": service.get("images", []),
        "tags": service.get("tags", []),
        "slug": service.get("slug", ""),
        "features": service.get("features", []),
        "techStack": service.get("techStack", []),
        "process": service.get("process", []),
        "created_at": service["created_at"].isoformat(),
        "updated_at": service["updated_at"].isoformat(),
    }


@router.get("/")
async def get_services(response: Response):
    cursor = (
        collection.find({}, LIST_FIELDS)
        .sort("created_at", -1)
        .allow_disk_use(True)
    )
    services = await cursor.to_list(100)
    response.headers["Cache-Control"] = "public, max-age=60, stale-while-revalidate=300"
    return [service_helper(s) for s in services]


@router.get("/admin/full")
async def get_services_admin():
    cursor = collection.find({}).sort("created_at", -1).allow_disk_use(True)
    services = await cursor.to_list(200)
    return [service_helper(s) for s in services]


@router.get("/slug/{slug}")
async def get_service_by_slug(slug: str):
    service = await collection.find_one({"slug": slug}, DETAIL_FIELDS)
    if service:
        return service_helper(service)
    raise HTTPException(status_code=404, detail="Service not found")


@router.get("/{service_id}")
async def get_service(service_id: str):
    service = await collection.find_one({"_id": ObjectId(service_id)}, DETAIL_FIELDS)
    if service:
        return service_helper(service)
    raise HTTPException(status_code=404, detail="Service not found")


@router.post("/")
async def create_service(service: Service):
    service_dict = service.dict()
    service_dict["created_at"] = datetime.utcnow()
    service_dict["updated_at"] = datetime.utcnow()
    result = await collection.insert_one(service_dict)
    new_service = await collection.find_one({"_id": result.inserted_id})
    return service_helper(new_service)


@router.put("/{service_id}")
async def update_service(service_id: str, service: Service):
    service_dict = service.dict()
    service_dict.pop("id", None)
    service_dict.pop("_id", None)
    service_dict["updated_at"] = datetime.utcnow()
    await collection.update_one({"_id": ObjectId(service_id)}, {"$set": service_dict})
    updated = await collection.find_one({"_id": ObjectId(service_id)})
    if updated:
        return service_helper(updated)
    raise HTTPException(status_code=404, detail="Service not found")


@router.delete("/{service_id}")
async def delete_service(service_id: str):
    result = await collection.delete_one({"_id": ObjectId(service_id)})
    if result.deleted_count:
        return {"message": "Service deleted"}
    raise HTTPException(status_code=404, detail="Service not found")

