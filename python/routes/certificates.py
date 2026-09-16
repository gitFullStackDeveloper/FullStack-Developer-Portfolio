from fastapi import APIRouter, HTTPException
from models.certificate import Certificate
from config import database
from bson import ObjectId
from datetime import datetime
from typing import List

router = APIRouter()
collection = database["certificates"]

def certificate_helper(cert) -> dict:
    return {
        "id": str(cert["_id"]),
        "title": cert.get("title", ""),
        "issuer": cert.get("issuer", ""),
        "icon": cert.get("icon", "fa-solid fa-award"),
        "color": cert.get("color", "#0891ff"),
        "date": cert.get("date", ""),
        "credential_url": cert.get("credential_url", ""),
        "created_at": cert["created_at"].isoformat(),
        "updated_at": cert["updated_at"].isoformat(),
    }

# GET all certificates
@router.get("/")
async def get_certificates():
    certs = await collection.find().sort("created_at", -1).to_list(100)
    return [certificate_helper(c) for c in certs]

# POST create certificate
@router.post("/")
async def create_certificate(cert: Certificate):
    cert_dict = cert.dict()
    cert_dict["created_at"] = datetime.utcnow()
    cert_dict["updated_at"] = datetime.utcnow()
    result = await collection.insert_one(cert_dict)
    new_cert = await collection.find_one({"_id": result.inserted_id})
    return certificate_helper(new_cert)

# PUT update certificate
@router.put("/{cert_id}")
async def update_certificate(cert_id: str, cert: Certificate):
    cert_dict = cert.dict()
    cert_dict["updated_at"] = datetime.utcnow()
    await collection.update_one(
        {"_id": ObjectId(cert_id)}, {"$set": cert_dict}
    )
    updated = await collection.find_one({"_id": ObjectId(cert_id)})
    if updated:
        return certificate_helper(updated)
    raise HTTPException(status_code=404, detail="Certificate not found")

# DELETE certificate
@router.delete("/{cert_id}")
async def delete_certificate(cert_id: str):
    result = await collection.delete_one({"_id": ObjectId(cert_id)})
    if result.deleted_count:
        return {"message": "Certificate deleted"}
    raise HTTPException(status_code=404, detail="Certificate not found")




# GET single certificate by ID
@router.get("/{cert_id}")
async def get_certificate(cert_id: str):
    try:
        obj_id = ObjectId(cert_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid certificate ID")

    cert = await collection.find_one({"_id": obj_id})
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return certificate_helper(cert)