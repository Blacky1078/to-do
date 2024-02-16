from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    Add_User,
    Retrieve_User
)

from server.models.User import UserSchema
from server.models.User import ErrorResponseModel
from server.models.User import ResponseModel
from server.models.User import UpdateUserModel

router = APIRouter()


@router.post("/", response_description="User data added into the database")
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_student = await Add_User(user)
    return ResponseModel(new_student,"Student Added SuccessFully.")


@router.get("/", response_description="User retrieved")
async def get_users():
    users = await Retrieve_User()
    if users:
        return ResponseModel(users, "Students data retrieved succeed")
    return ResponseModel(users, "Empty list returned")