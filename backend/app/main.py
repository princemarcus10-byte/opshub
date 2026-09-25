from fastapi import FastAPI

from app.routers.services import router as services_router


app = FastAPI(
    title="OpsHub API",
    description="Production operations platform API",
    version="0.1.0",
)


app.include_router(services_router)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "OpsHub API",
    }
