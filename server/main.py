from http import client
from fastapi import Depends, FastAPI, HTTPException
from db.database import get_db,init_db
from db.models import UserDB
import schemas.UserSchemas as schemas
from sqlalchemy.orm import Session
import os
from groq import Groq
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


from fastapi import FastAPI
from groq import Groq
import os
import json

app = FastAPI()

@app.get("/generate-path")
async def generate_learning_path():
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY")
    )

    prompt = """
    You are an AI system that generates structured learning paths.

    TASK:
    Generate a personalized learning path for the following user.

    USER DETAILS:
    - Goal: Become a Backend Developer
    - Current Level: Beginner in programming
    - Timeframe: 12 months
    - Availability: 10 hours per week
    - Learning Preference: Online courses and hands-on projects

    OUTPUT RULES (STRICT):
    - Respond ONLY in valid JSON
    - Do NOT include explanations or markdown
    - Follow EXACTLY this JSON structure:

    {
      "meta": {
        "goal": string,
        "duration_months": number,
        "weekly_time_hours": number,
        "level": string
      },
      "learning_path": [
        {
          "stage": string,
          "duration_months": number,
          "focus": [string],
          "skills": [string],
          "resources": [
            {
              "type": string,
              "title": string,
              "platform": string,
              "link": string
            }
          ],
          "projects": [
            {
              "title": string,
              "description": string
            }
          ]
        }
      ]
    }
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    content = response.choices[0].message.content

    # Ensure frontend always receives JSON
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "error": "Model returned invalid JSON",
            "raw_output": content
        }


@app.get("/user-profile")
async def user_profile():
    return "User profile management endpoint"


@app.get("/progress-tracking")
async def progress_tracking():
    return "Progress tracking endpoint"
