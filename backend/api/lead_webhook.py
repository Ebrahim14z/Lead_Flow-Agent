from fastapi import APIRouter

from backend.schemas.lead_schema import Lead
from backend.services.lead_service import process_lead

router = APIRouter()


@router.post("/webhooks/leads")
def receive_lead(lead: Lead):
    result=process_lead(lead)

    return {
        "status": "received",
        "lead": lead
    }