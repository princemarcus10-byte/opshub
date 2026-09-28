from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.incident import Incident
from app.schemas.incident import IncidentResponse


router = APIRouter(prefix="/incidents", tags=["Incidents"])


@router.get("/", response_model=list[IncidentResponse])
def list_incidents(db: Session = Depends(get_db)):
    return db.scalars(select(Incident)).all()


@router.post("/", response_model=IncidentResponse)
def create_incident(
    title: str,
    service: str,
    severity: str = "Medium",
    db: Session = Depends(get_db),
):
    incident = Incident(
        title=title,
        service=service,
        severity=severity,
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return incident
    
@router.patch("/{incident_id}", response_model=IncidentResponse)
def update_incident(
    incident_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    incident = db.get(Incident, incident_id)

    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")

    incident.status = status

    db.commit()
    db.refresh(incident)

    return incident
