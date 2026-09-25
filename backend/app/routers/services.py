from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.service import Service


router = APIRouter(prefix="/services", tags=["Services"])


@router.get("/")
def list_services(db: Session = Depends(get_db)):
    return db.scalars(select(Service)).all()


@router.post("/")
def create_service(
    name: str,
    team: str,
    db: Session = Depends(get_db),
):
    service = Service(
        name=name,
        team=team,
    )

    db.add(service)
    db.commit()
    db.refresh(service)

    return service
