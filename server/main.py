from fastapi import Depends, FastAPI, HTTPException
from db.database import get_db,init_db
from db.models import UserDB
import schemas.UserSchemas as schemas
from sqlalchemy.orm import Session
import os
from openai import OpenAI
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

@app.post("/login")
async def login_user(user:schemas.UserLogin,db:Session=Depends(get_db)):
    try:
        db_user=db.query(UserDB).filter(UserDB.email==user.email).first()
        if not db_user or db_user.hashed_password != user.password:
            return {"error":"Invalid email or password"}
    except Exception as e:
        print(str(e))
        return {"error": str(e)}
    return {"message":"Login successful","user_id":db_user.id}


@app.get("/generate-path")
async def generate_learning_path():
    api_key = "api key"
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY is not set")

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )

    site_url = os.getenv("SITE_URL", "http://localhost")
    site_name = os.getenv("SITE_NAME", "AiLP")
    model = os.getenv("OPENROUTER_MODEL", "openai/gpt-5.2")

    try:
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": site_url,
                "X-Title": site_name,
            },
            model=model,
            max_tokens=int(os.getenv("MAX_TOKENS", "512")),
            temperature=float(os.getenv("TEMPERATURE", "0.7")),
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Generate a personalized learning path to achieve the user's goal, "
                        "based on their background and constraints. Include stages from "
                        "beginner to advanced, recommended resources, and hands-on projects.\n\n"
                        "User background: Beginner in programming, aims to become a full-stack "
                        "developer within a year.\nConstraints: 10 hours/week, prefers online "
                        "courses and hands-on projects."
                    ),
                }
            ],
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

    content = (
        completion.choices[0].message.content if completion and completion.choices else ""
    )
    return {"content": content}

@app.get("/user-profile")
async def user_profile():
    return "User profile management endpoint"


@app.get("/progress-tracking")
async def progress_tracking():
    return "Progress tracking endpoint"
