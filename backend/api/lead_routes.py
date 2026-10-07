from fastapi import APIRouter

from backend.database.supabase_client import supabase
from backend.schemas.lead_schema import LeadUpdate
from backend.schemas.lead_schema import Lead

from backend.services.qualification_service import (
    qualify_lead,
    calculate_score,
    get_category,
)

router = APIRouter()


@router.get("/leads")
def get_leads():
    response = supabase.table("leads").select("*").execute()

    return {
        "leads": response.data
    }


@router.get("/leads/{lead_id}")
def get_lead(lead_id: int):
    response = (
        supabase
        .table("leads")
        .select("*")
        .eq("id", lead_id)
        .execute()
    )

    if not response.data:
        return {
            "message": "Lead not found"
        }

    return response.data[0]


@router.put("/leads/{lead_id}")
def update_lead(lead_id: int, lead: LeadUpdate):

    lead_data = {
        "name": lead.name,
        "email": lead.email,
        "company": lead.company,
        "job_title": lead.job_title,
        "message": lead.message,
    }

    response = (
        supabase
        .table("leads")
        .update(lead_data)
        .eq("id", lead_id)
        .execute()
    )

    if not response.data:
        return {
            "message": "Lead not found"
        }

    return response.data[0]


@router.delete("/leads/{lead_id}")
def delete_lead(lead_id: int):

    response = (
        supabase
        .table("leads")
        .delete()
        .eq("id", lead_id)
        .execute()
    )

    if not response.data:
        return {
            "message": "Lead not found"
        }

    return {
        "message": "Lead deleted successfully",
        "lead": response.data[0]
    }


@router.post("/leads/{lead_id}/qualify")
def qualify_existing_lead(lead_id: int):

    # 1. Get lead from database
    response = (
        supabase
        .table("leads")
        .select("*")
        .eq("id", lead_id)
        .execute()
    )

    if not response.data:
        return {
            "message": "Lead not found"
        }

    # 2. Convert database data to Lead object
    lead = Lead(**response.data[0])

    # 3. Ask AI to evaluate the lead
    result = qualify_lead(lead)

    # 4. Calculate deterministic score
    score = calculate_score(result)

    # 5. Determine lead category
    category = get_category(score)

    # 6. Prepare qualification result
    qualification_data = {
        "lead_id": lead_id,
        "company_fit": result.company_fit,
        "need": result.need,
        "intent": result.intent,
        "budget_fit": result.budget_fit,
        "authority": result.authority,
        "urgency": result.urgency,
        "score": score,
        "category": category,
        "reason": result.reason,
    }

    # 7. Save qualification result in database
    saved_result = (
        supabase
        .table("qualification_results")
        .insert(qualification_data)
        .execute()
    )

    # 8. Return result
    return {
        "lead_id": lead_id,
        "qualification": saved_result.data[0]
    }