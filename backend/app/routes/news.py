from fastapi import APIRouter, HTTPException

from app.models.schema import NewsItem
from app.db import database
from app.core.workflow import FactCheckingWorkflowManager

from datetime import datetime

router = APIRouter()

@router.post("/news-check", response_model=NewsItem)
async def fact_check_news(item: NewsItem):
    """
    Accepts a JSON body with a 'input_data' field, processes it using the fact-checking workflow,
    and saves the resulting report in MongoDB.
    """
    try:
        
        workflow_manager = FactCheckingWorkflowManager()
        state = workflow_manager.run_workflow(item.input_data)
        
        final_state = {
            "report":state['report'],
            "relevant_metadata":state['relevant_metadata'],
            "metadata":state['metadata']
            }
        
        date = datetime.now().strftime("%I:%M%p on %B %d, %Y")
        
        # Save the processed news to MongoDB
        news_document = {
            "input_data": item.input_data,
            "final_state": final_state,
            "created_at": date
        }
        await database.db["newshistory"].insert_one(news_document)
        
        item.final_state = final_state
        item.created_at = date
        return item
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
    
@router.get("/news-history", response_model=list[NewsItem])
async def get_news_history():
    """
    Fetches all saved news reports from MongoDB.
    """
    try:
        news_list = await database.db["newshistory"].find().to_list(None)
        return news_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
