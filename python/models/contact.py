from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Contact(BaseModel):
    name: str
    email: str
    service: Optional[str] = ""
    message: Optional[str] = ""
    # Step 2 fields
    projectType: Optional[str] = ""
    budgetRange: Optional[str] = ""
    timeline: Optional[str] = ""
    company: Optional[str] = ""
    country: Optional[str] = ""
    description: Optional[str] = ""
    goals: Optional[str] = ""
    features: Optional[str] = ""
    meetingDate: Optional[str] = ""
    meetingTime: Optional[str] = ""
    # Admin metadata
    status: str = "new"  # new / read / responded
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInDB(Contact):
    id: str = Field(alias="_id")