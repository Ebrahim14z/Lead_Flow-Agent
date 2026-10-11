
from fastapi import APIRouter, HTTPException

from backend.database.supabase_client import supabase
from backend.schemas.follow_up_schema import FollowUpCreate

router = APIRouter()


@router.get("/leads/{lead_id}/follow-ups")
def get_follow_ups(lead_id: int):
    lead_response = (
        supabase.table("leads")
        .select("id")
        .eq("id", lead_id)
        .execute()
    )

    if not lead_response.data:
        raise HTTPException(
            status_code=404,
            detail="Lead not found",
        )

    response = (
        supabase.table("lead_follow_ups")
        .select("*")
        .eq("lead_id", lead_id)
        .order("follow_up_date", desc=False)
        .execute()
    )

    return {"follow_ups": response.data or []}


@router.post("/leads/{lead_id}/follow-ups", status_code=201)
def create_follow_up(
    lead_id: int,
    follow_up: FollowUpCreate,
):
    lead_response = (
        supabase.table("leads")
        .select("id")
        .eq("id", lead_id)
        .execute()
    )

    if not lead_response.data:
        raise HTTPException(
            status_code=404,
            detail="Lead not found",
        )

    follow_up_data = {
        "lead_id": lead_id,
        "method": follow_up.method,
        "follow_up_date": follow_up.follow_up_date.isoformat(),
        "notes": follow_up.notes,
    }

    response = (
        supabase.table("lead_follow_ups")
        .insert(follow_up_data)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=500,
            detail="Failed to save follow-up",
        )

    return {"follow_up": response.data[0]}
