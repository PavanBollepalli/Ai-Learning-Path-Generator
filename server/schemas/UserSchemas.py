from pydantic import BaseModel, EmailStr,StringConstraints

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str