from backend.schemas.lead_schema import Lead
from backend.database.supabase_client import supabase


def process_lead(lead: Lead):
    lead_data = {
        "Id":lead.id,
        "name": lead.name,
        "email": lead.email,
        "company": lead.company,
        "job_title": lead.job_title,
        "message": lead.message,
    }

    response = supabase.table("leads").insert(lead_data).execute()

    return response.data[0]