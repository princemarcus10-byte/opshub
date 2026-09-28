from pydantic import BaseModel, ConfigDict


class ServiceResponse(BaseModel):
    id: int
    name: str
    team: str
    status: str

    model_config = ConfigDict(from_attributes=True)
