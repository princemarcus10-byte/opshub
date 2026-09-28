from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.services import router as services_router
from app.routers.incidents import router as incidents_router


app = FastAPI(
    title="OpsHub API",
    description="Production operations platform API",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(services_router)
app.include_router(incidents_router)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "OpsHub API",
    }
