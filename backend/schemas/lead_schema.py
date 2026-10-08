from pydantic import BaseModel


class Lead(BaseModel):
    name: str
    email: str
    company: str
    job_title: str
    industry: str
    company_size: int
    budget: float
    timeline: str
    need: str
    message: str


class LeadUpdate(BaseModel):
    name: str
    email: str
    company: str
    job_title: str
    industry: str
    company_size: int
    budget: float
    timeline: str
    need: str
    message: str