from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Query
from models.contact import Contact
from config import database
from bson import ObjectId

import asyncio
from utils.email_service import send_email, parse_meeting_datetime, ADMIN_EMAIL

router = APIRouter()
collection = database["contacts"]

def contact_helper(contact) -> dict:
    return {
        "id": str(contact["_id"]),
        "name": contact.get("name", ""),
        "email": contact.get("email", ""),
        "service": contact.get("service", ""),
        "message": contact.get("message", ""),
        "projectType": contact.get("projectType", ""),
        "budgetRange": contact.get("budgetRange", ""),
        "timeline": contact.get("timeline", ""),
        "company": contact.get("company", ""),
        "country": contact.get("country", ""),
        "description": contact.get("description", ""),
        "goals": contact.get("goals", ""),
        "features": contact.get("features", ""),
        "meetingDate": contact.get("meetingDate", ""),
        "meetingTime": contact.get("meetingTime", ""),
        "status": contact.get("status", "new"),
        "created_at": contact["created_at"].isoformat(),
        "updated_at": contact["updated_at"].isoformat(),
    }

@router.get("/")
async def get_contacts(
    meetingDate: str = Query(None),
    meetingTime: str = Query(None),
    status: str = Query(None)
):
    query = {}
    if meetingDate:
        query["meetingDate"] = meetingDate
    if meetingTime:
        query["meetingTime"] = meetingTime
    if status:
        query["status"] = status
    contacts = await collection.find(query).sort("created_at", -1).to_list(100)
    return [contact_helper(c) for c in contacts]

@router.get("/{contact_id}")
async def get_contact(contact_id: str):
    contact = await collection.find_one({"_id": ObjectId(contact_id)})
    if contact:
        return contact_helper(contact)
    raise HTTPException(status_code=404, detail="Contact not found")

@router.post("/")
async def create_contact(contact: Contact):
    contact_dict = contact.dict()
    contact_dict["created_at"] = datetime.utcnow()
    contact_dict["updated_at"] = datetime.utcnow()
    result = await collection.insert_one(contact_dict)
    new_contact = await collection.find_one({"_id": result.inserted_id})
    contact_id = str(result.inserted_id)

    client_email = contact_dict.get("email")
    if client_email:
        subject = "We received your project inquiry"
        body = f"""Hi {contact_dict.get('name', '')},\n\nThank you for contacting us! We've received your message and will get back to you soon.\n\nBest regards,\nArham Raza"""
        await send_email(client_email, subject, body)

        meeting_date = contact_dict.get("meetingDate")
        meeting_time = contact_dict.get("meetingTime")
        if meeting_date and meeting_time:
            try:
                meeting_dt = parse_meeting_datetime(meeting_date, meeting_time)
                delay = (meeting_dt - timedelta(hours=1) - datetime.utcnow()).total_seconds()
                if delay > 0:
                    async def send_reminder():
                        await asyncio.sleep(delay)
                        reminder_subject = "Reminder: Your project meeting is in 1 hour"
                        reminder_body = f"""Hi {contact_dict.get('name', '')},\n\nThis is a friendly reminder that your project meeting is scheduled in 1 hour at {meeting_time}.\n\nWe look forward to speaking with you!\n\nBest regards,\nArham Raza"""
                        await send_email(client_email, reminder_subject, reminder_body)
                    asyncio.create_task(send_reminder())
            except Exception as e:
                print(f"Failed to schedule reminder: {e}")

    if ADMIN_EMAIL:
        admin_subject = "New Project Inquiry"
        admin_body = f"""New inquiry received:\n\nName: {contact_dict.get('name', '')}\nEmail: {client_email}\nService: {contact_dict.get('service', '')}\nMessage: {contact_dict.get('message', '')}\nMeeting: {contact_dict.get('meetingDate', '')} at {contact_dict.get('meetingTime', '')}"""
        await send_email(ADMIN_EMAIL, admin_subject, admin_body)

    return contact_helper(new_contact)
@router.put("/{contact_id}")
async def update_contact(contact_id: str, contact: Contact):
    contact_dict = contact.dict()
    contact_dict["updated_at"] = datetime.utcnow()
    await collection.update_one(
        {"_id": ObjectId(contact_id)}, {"$set": contact_dict}
    )
    updated = await collection.find_one({"_id": ObjectId(contact_id)})
    if updated:
        return contact_helper(updated)
    raise HTTPException(status_code=404, detail="Contact not found")

# PATCH status
@router.patch("/{contact_id}/status")
async def update_status(contact_id: str, status: str):
    if status not in ("new", "read", "responded"):
        raise HTTPException(status_code=400, detail="Invalid status")
    await collection.update_one(
        {"_id": ObjectId(contact_id)},
        {"$set": {"status": status, "updated_at": datetime.utcnow()}}
    )
    return {"message": "Status updated"}

# DELETE
@router.delete("/{contact_id}")
async def delete_contact(contact_id: str):
    result = await collection.delete_one({"_id": ObjectId(contact_id)})
    if result.deleted_count:
        return {"message": "Contact deleted"}
    raise HTTPException(status_code=404, detail="Contact not found")