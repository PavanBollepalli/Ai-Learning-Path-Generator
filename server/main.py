from fastapi import FastAPI

app = FastAPI()
@app.get("/")
async def read_root():
    return "ai learning path generator"  