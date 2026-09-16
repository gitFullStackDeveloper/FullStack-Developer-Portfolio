from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Project(BaseModel):
    title: str
    type: Optional[str] = ""
    category: Optional[str] = ""
    image: Optional[str] = ""
    images: List[str] = []
    tech: List[str] = []
    desc: Optional[str] = ""
    liveLink: Optional[str] = ""
    codeLink: Optional[str] = ""
    featured: bool = False
    badge: Optional[str] = ""
    price: Optional[str] = ""
    originalPrice: Optional[str] = ""
    techStack: List[str] = []
    features: List[dict] = []
    includes: List[str] = []
    faqs: List[dict] = []
    description: Optional[str] = ""
    isForSale: bool = True
    showPrice: bool = True 
    hidden: bool = False  
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectInDB(Project):
    id: str = Field(alias="_id")