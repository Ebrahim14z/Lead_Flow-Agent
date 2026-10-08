from backend.schemas.lead_schema import Lead
from backend.database.supabase_client import supabase


def process_lead(lead: Lead):

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
        .insert(lead_data)
        .execute()
    )

    return response.data[0]