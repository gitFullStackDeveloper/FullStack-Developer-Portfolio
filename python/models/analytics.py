from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ViewEvent(BaseModel):
    page_type: str               # "service", "project", "home", "services", "portfolio"
    item_id: Optional[str] = None
    path: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)