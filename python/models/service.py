from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Service(BaseModel):
    title: str
    subtitle: Optional[str] = ""          # new
    overview: Optional[str] = ""          # new
    description: Optional[str] = ""
    category: Optional[str] = ""
    icon: Optional[str] = ""
    image: Optional[str] = ""
    images: List[str] = []
    tags: List[str] = []
    slug: Optional[str] = ""
    features: List[dict] = []             # {title, desc}
    techStack: List[str] = []             # now a list of strings (like tags)
    process: List[dict] = []              # {step, title, desc}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
class ServiceInDB(Service):
    id: str = Field(alias="_id")