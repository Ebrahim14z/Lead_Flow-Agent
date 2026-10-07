from pydantic import BaseModel, Field


from pydantic import BaseModel, Field


class QualificationResult(BaseModel):
    company_fit: int = Field(ge=0, le=10)
    need: int = Field(ge=0, le=10)
    intent: int = Field(ge=0, le=10)
    budget_fit: int = Field(ge=0, le=10)
    authority: int = Field(ge=0, le=10)
    urgency: int = Field(ge=0, le=10)
    reason: str