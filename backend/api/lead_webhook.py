# from fastapi import APIRouter

# from backend.schemas.lead_schema import Lead
# from backend.services.lead_service import process_lead

# router = APIRouter()


# @router.post("/webhooks/leads")
# def receive_lead(lead: Lead):
#     result=process_lead(lead)

#     return {
#         "status": "received",
#         "lead": lead
#     }


from fastapi import APIRouter, HTTPException

from backend.schemas.lead_schema import Lead
from backend.services.lead_service import process_lead
from backend.agent.agent import run_agent

router = APIRouter()


@router.post("/webhooks/leads")
def receive_lead(lead: Lead):
    # Save the lead first
    saved_lead = process_lead(lead)

    # Run the AI agent automatically
    try:
        agent_result = run_agent(saved_lead["id"])

        return {
            "status": "received",
            "lead": saved_lead,
            "qualification": agent_result.model_dump(),
        }

    except Exception as e:
        # Keep the saved lead even if qualification fails
        return {
            "status": "received",
            "lead": saved_lead,
            "qualification_status": "failed",
            "qualification_error": str(e),
        }
