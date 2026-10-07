from pydantic import BaseModel


class Lead(BaseModel):
    name: str
    email: str
    company: str
    job_title: str
    message: str


class LeadUpdate(BaseModel):
    name: str
    email: str
    company: str
    job_title: str
    message: str