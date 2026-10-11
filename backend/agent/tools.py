from langchain_core.tools import tool

from backend.database.supabase_client import supabase

from backend.schemas.lead_schema import Lead
from backend.schemas.company_profile_schema import CompanyProfile
from backend.schemas.qualification_schema import QualificationResult

from backend.services.qualification_service import (
    qualify_lead as run_ai_qualification,
    calculate_score,
    get_category,
)


@tool
def get_lead(lead_id: int) -> dict:
    """
    Get a lead from the database using its ID.
    """

    response = (
        supabase
        .table("leads")
        .select("*")
        .eq("id", lead_id)
        .execute()
    )

    if not response.data:
        return {
            "error": "Lead not found"
        }

    return response.data[0]


@tool
def get_company_profile() -> dict:
    """
    Get the company profile used by LeadFlow.
    """

    response = (
        supabase
        .table("company_profiles")
        .select("*")
        .limit(1)
        .execute()
    )

    if not response.data:
        return {
            "error": "Company profile not found"
        }

    return response.data[0]


@tool
def qualify_lead(
    lead_data: dict,
    company_profile_data: dict
) -> dict:
    """
    Analyze a lead using the company profile.

    This tool only performs AI qualification.

    It does NOT:
    - calculate the overall score
    - determine HOT/WARM/COLD
    - save anything to the database
    """

    try:

        # Convert database data into Pydantic models

        lead = Lead(
            **lead_data
        )

        company_profile = CompanyProfile(
            **company_profile_data
        )

        # Run AI qualification

        result = run_ai_qualification(
            lead,
            company_profile
        )

        return {
            "company_fit": result.company_fit,
            "need": result.need,
            "intent": result.intent,
            "budget_fit": result.budget_fit,
            "authority": result.authority,
            "urgency": result.urgency,
            "reason": result.reason,
        }

    except Exception as e:

        return {
            "error": f"Qualification failed: {str(e)}"
        }


@tool
def save_qualification(
    lead_id: int,
    qualification_data: dict
) -> dict:
    """
    Calculate the deterministic score and category,
    then save the qualification result to the database.

    The score is calculated by Python business logic.
    The category is determined from the score.
    """

    try:

        # Convert AI result into the qualification schema

        result = QualificationResult(
            company_fit=qualification_data["company_fit"],
            need=qualification_data["need"],
            intent=qualification_data["intent"],
            budget_fit=qualification_data["budget_fit"],
            authority=qualification_data["authority"],
            urgency=qualification_data["urgency"],
            reason=qualification_data["reason"],
        )

        # Calculate deterministic score

        score = calculate_score(
            result
        )

        # Determine category

        category = get_category(
            score
        )

        # Prepare database record

        data = {
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

        # Save to Supabase

        response = (
            supabase
            .table("qualification_results")
            .insert(data)
            .execute()
        )

        if not response.data:

            return {
                "error": "Failed to save qualification result"
            }

        return {
            "lead_id": lead_id,
            "qualification": response.data[0]
        }

    except Exception as e:

        return {
            "error": f"Failed to save qualification: {str(e)}"
        }


TOOLS = [
    get_lead,
    get_company_profile,
    qualify_lead,
    save_qualification,
]