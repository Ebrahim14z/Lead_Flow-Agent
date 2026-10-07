from fastapi import FastAPI

from backend.api.lead_webhook import router as lead_webhook_router
from backend.api.lead_routes import router as lead_router

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Welcome to Lead Flow"
    }


app.include_router(lead_webhook_router)
app.include_router(lead_router)