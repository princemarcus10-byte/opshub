from pydantic import BaseModel, ConfigDict


class AuditEventResponse(BaseModel):
    id: int
    action: str
    resource: str
    actor: str
    category: str

    model_config = ConfigDict(from_attributes=True)
