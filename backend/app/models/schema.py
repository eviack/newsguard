from pydantic import BaseModel
from typing import Optional

class NewsItem(BaseModel):
    input_data: str
    final_state: Optional[dict] = None  # The report will be filled in after processing
    created_at: Optional[str] = None
