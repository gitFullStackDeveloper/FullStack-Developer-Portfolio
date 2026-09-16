from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Certificate(BaseModel):
    title: str
    issuer: str = ""
    icon: str = "fa-solid fa-award"   # FontAwesome class
    color: str = "#0891ff"            # accent color
    date: Optional[str] = ""          # e.g., "2025"
    credential_url: Optional[str] = ""  # link to view certificate
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)