from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str
    MONGODB_DB: str

    GROQ_API_KEY: str
    TAVILY_API_KEY: str
    QURL: str
    QAPI_KEY: str
    QCOLLECTION: str

    class Config:
        env_file = ".env"  # Ensure you create a .env file with these variables

settings = Settings()
