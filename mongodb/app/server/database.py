import pymongo
from bson.objectid import ObjectId


MongoServer = "mongodb+srv://admin:nasa1999@dropship.ffcnt85.mongodb.net/?retryWrites=true&w=majority"

myClient = pymongo.MongoClient(MongoServer)

myDb = myClient.get_database("UsersData")

myCll = myDb["UserLogins"]
# Helpers


def user_helper(user) -> dict:
    return{
        "id": str(user["_id"]),
        "FirstName": user["FirstName"],
        "LastName": user["LastName"],
        "Email": user["Email"],
        "Password": user["Password"]
    }

import asyncio

async def Retrieve_User():
    Users = []
    cursor = myCll.find()
    documents = [document async for document in cursor]
    for document in documents:
        Users.append(user_helper(document))
    return Users



async def Add_User(student_data: dict) -> dict:
    User = await myCll.insert_one(student_data)
    new_user = await myCll.find_one({"_id": User.inserted_id})
    return user_helper(new_user)