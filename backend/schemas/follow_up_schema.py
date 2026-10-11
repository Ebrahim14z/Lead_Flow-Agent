
from datetime import date
from typing import Literal

from pydantic import BaseModel, Field


class FollowUpCreate(BaseModel):
    method: Literal["email", "call", "meeting"]
    follow_up_date: date
    notes: str = Field(default="", max_length=2000)


class FollowUpStatusUpdate(BaseModel):
    status: Literal["pending", "completed", "cancelled"]
