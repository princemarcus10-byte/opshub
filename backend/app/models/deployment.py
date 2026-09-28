from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Deployment(Base):
    __tablename__ = "deployments"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    service: Mapped[str] = mapped_column(String(100))
    version: Mapped[str] = mapped_column(String(100))
    environment: Mapped[str] = mapped_column(String(50), default="Production")
    status: Mapped[str] = mapped_column(String(30), default="Successful")
