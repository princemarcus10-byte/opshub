from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.audit_event import AuditEvent
from app.models.deployment import Deployment
from app.schemas.deployment import DeploymentResponse


router = APIRouter(prefix="/deployments", tags=["Deployments"])


@router.get("/", response_model=list[DeploymentResponse])
def list_deployments(db: Session = Depends(get_db)):
    return db.scalars(
        select(Deployment).order_by(Deployment.id.desc())
    ).all()


@router.post("/", response_model=DeploymentResponse)
def create_deployment(
    service: str,
    version: str,
    environment: str = "Production",
    status: str = "Successful",
    db: Session = Depends(get_db),
):
    deployment = Deployment(
        service=service,
        version=version,
        environment=environment,
        status=status,
    )

    db.add(deployment)
    db.commit()
    db.refresh(deployment)

    audit_event = AuditEvent(
        action="Deployed",
        resource=f"{deployment.service} {deployment.version}",
        actor="Markus",
        category="Deployment",
    )

    db.add(audit_event)
    db.commit()

    return deployment
