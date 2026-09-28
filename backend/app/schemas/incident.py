from pydantic import BaseModel, ConfigDict


class IncidentResponse(BaseModel):
    id: int
    title: str
    service: str
    severity: str
    status: str

    model_config = ConfigDict(from_attributes=True)
