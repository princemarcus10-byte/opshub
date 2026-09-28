from fastapi import Depends, FastAPI
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app.routers.services import router as services_router
from app.routers.incidents import router as incidents_router
from app.database import get_db
from app.models.incident import Incident
from app.models.service import Service

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
    
@app.get("/dashboard/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    service_count = db.scalar(select(func.count(Service.id))) or 0

    active_incident_count = (
        db.scalar(
            select(func.count(Incident.id)).where(
                Incident.status != "Resolved"
            )
        )
        or 0
    )

    return {
        "services": service_count,
        "active_incidents": active_incident_count,
    }
