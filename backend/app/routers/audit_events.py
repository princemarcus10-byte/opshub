from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.audit_event import AuditEvent
from app.schemas.audit_event import AuditEventResponse

router = APIRouter(prefix="/audit-events", tags=["Audit Log"])


@router.get("/", response_model=list[AuditEventResponse])
def list_audit_events(db: Session = Depends(get_db)):
    return db.scalars(
        select(AuditEvent).order_by(AuditEvent.id.desc())
    ).all()
