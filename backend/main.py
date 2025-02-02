from fastapi import FastAPI
from app.routes import news
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="news-check", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(news.router)

@app.get("/")
def root():
    return {"message": "Fact-Checking API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
