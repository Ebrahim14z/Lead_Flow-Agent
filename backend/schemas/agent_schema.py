from typing import Literal

from pydantic import BaseModel, Field


class AgentDecision(BaseModel):
    lead_id: int

    score: int = Field(
        ge=0,
        le=100
    )

    category: Literal[
        "HOT",
        "WARM",
        "COLD"
    ]

    reason: str

    action: str