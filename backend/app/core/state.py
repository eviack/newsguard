from typing import Dict, Optional, Union, List
from typing_extensions import TypedDict

#state
class FactCheckingState(TypedDict):
    input_data: Union[str]  
    cleaned_text: Optional[str]          
    summary: Optional[str]               
    search_results: Optional[List[Dict]] # Raw articles from Tavily
    chunks: Optional[List[str]]          # Chunked text from articles
    embeddings: Optional[List[List[float]]]  # Embeddings of chunks
    relevant_chunks: Optional[List[str]] # Retrieved chunks from Qdrant
    relevant_metadata: Optional[List[str]]
    metadata: Optional[List[Dict]]        # Metadata (e.g., URL) for chunks
    report: Optional[str]