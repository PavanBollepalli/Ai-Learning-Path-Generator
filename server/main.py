from fastapi import Depends, FastAPI
from db.database import get_db,init_db
from db.models import UserDB
import schemas.UserSchemas as schemas
from sqlalchemy.orm import Session
init_db()
app = FastAPI()
@app.get("/")
async def read_root():
    return "ai learning path generator"  

@app.post("/register")
async def register_user(user:schemas.UserCreate,db:Session=Depends(get_db)):
    try:
        db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
        if db_user:
            return {"error": "Email already registered"}
        new_user = UserDB(
            username=user.username,
            email=user.email,
            hashed_password=user.password  
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e :
        print(str(e))
        return {"error": str(e)}
    return {"message": "User registered successfully", "user_id": new_user.id}

@app.get("/login")
async def login_user():
    return "User login endpoint"

@app.get("/generate-path")
async def generate_learning_path():
    return "Learning path generation endpoint"

@app.get("/user-profile")
async def user_profile():
    return "User profile management endpoint"


@app.get("/progress-tracking")
async def progress_tracking():
    return "Progress tracking endpoint"