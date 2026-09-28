from pydantic import BaseModel, ConfigDict


class DeploymentResponse(BaseModel):
    id: int
    service: str
    version: str
    environment: str
    status: str

    model_config = ConfigDict(from_attributes=True)
