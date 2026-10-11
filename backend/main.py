from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.follow_up_routes import router as follow_up_router

from backend.api.lead_webhook import router as lead_webhook_router
from backend.api.lead_routes import router as lead_router


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Lead Flow"
    }


app.include_router(lead_webhook_router)
app.include_router(lead_router)

app.include_router(follow_up_router)
