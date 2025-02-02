from typing import Dict, List
from tavily import TavilyClient
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from app.config import settings

class SearchAgent:
    def __init__(self):
        self.tavily = TavilyClient(api_key=settings.TAVILY_API_KEY)
        self.embedder = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)

    def run(self, state: Dict) -> Dict:
        
        results = self.tavily.search(
            query=state["summary"],
            max_results=10
        )
        state["search_results"] = results["results"]

        # Process articles into chunks & embeddings
        state["chunks"], state["metadata"], state["embeddings"] = self._process_articles(state["search_results"])
        return state

    def _process_articles(self, articles: List[Dict]) -> tuple:
        chunks, metadata = [], []
        for article in articles:
            article_chunks = self.text_splitter.split_text(article["title"] + " " + article["content"])
            chunks.extend(article_chunks)
            metadata.extend([{"url": article["url"]} for _ in article_chunks])  # Store metadata per chunk
        
        embeddings = self.embedder.embed_documents(chunks)
        return chunks, metadata, embeddings