from fastapi import APIRouter

from backend.database.supabase_client import supabase
from backend.schemas.lead_schema import LeadUpdate
from backend.schemas.lead_schema import Lead
from backend.schemas.company_profile_schema import CompanyProfile

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
    "industry": lead.industry,
    "company_size": lead.company_size,
    "budget": lead.budget,
    "timeline": lead.timeline,
    "need": lead.need,
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

    # Get lead
    lead_response = (
        supabase
        .table("leads")
        .select("*")
        .eq("id", lead_id)
        .execute()
    )

    if not lead_response.data:
        return {
            "message": "Lead not found"
        }

    lead = Lead(**lead_response.data[0])

    # Get company profile
    company_response = (
        supabase
        .table("company_profiles")
        .select("*")
        .limit(1)
        .execute()
    )

    if not company_response.data:
        return {
            "message": "Company profile not found"
        }

    company_data = company_response.data[0]

    company_profile = CompanyProfile(
        company_name=company_data["company_name"],
        description=company_data["description"],
        products=company_data["products"],
        target_industries=company_data["target_industries"],
        min_budget=company_data["min_budget"],
        max_budget=company_data["max_budget"],
        min_company_size=company_data["min_company_size"],
        max_company_size=company_data["max_company_size"],
        target_job_titles=company_data["target_job_titles"],
    )

    # Qualify lead using company profile
    result = qualify_lead(
        lead,
        company_profile
    )

    # Calculate deterministic score
    score = calculate_score(result)

    # Determine category
    category = get_category(score)

    # Save qualification result
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

    saved_result = (
        supabase
        .table("qualification_results")
        .insert(qualification_data)
        .execute()
    )

    return {
        "lead_id": lead_id,
        "qualification": saved_result.data[0]
    }