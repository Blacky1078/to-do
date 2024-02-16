from typing import Optional

from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    FirstName: str = Field(...)
    LastName: str = Field(...)
    Email: EmailStr = Field(...)
    Password: str = Field(...)


class UpdateUserModel(BaseModel):
    FirstName: Optional[str] 
    Lastname: Optional[str] 
    Email: Optional[EmailStr] 
    Password: Optional[str] 


def ResponseModel(data, Message):
    return {
        "data": [data],
        "code": 200,
        "message": Message
    }


def ErrorResponseModel(error,code,message):
    return {"error": error, "code": code, "message": message}