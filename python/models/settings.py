from pydantic import BaseModel, Field, validator
from typing import List, Optional, Union

class SocialLink(BaseModel):
    icon: str
    name: str
    url: str

class SpecificDate(BaseModel):
    date: str                     # "2026-07-24"
    time_slots: List[str] = []    # per‑date slots; if empty, use global

class MeetingAvailability(BaseModel):
    allowed_days: List[int] = [0,1,2,3,4]
    time_slots: List[str] = ["09:00","09:30","10:00","10:30","11:00","14:00","14:30","15:00","15:30","16:00"]
    specific_dates: List[SpecificDate] = []

    @validator('specific_dates', pre=True)
    def parse_legacy_dates(cls, v):
        if isinstance(v, list):
            result = []
            for item in v:
                if isinstance(item, str):
                    result.append(SpecificDate(date=item, time_slots=[]))
                elif isinstance(item, dict):
                    result.append(item)
            return result
        return v

class Settings(BaseModel):
    social_links: List[SocialLink] = []
    meeting: MeetingAvailability = MeetingAvailability()
    resume_url: Optional[str] = ""   
class SettingsInDB(Settings):
    id: str = Field(alias="_id", default="global")