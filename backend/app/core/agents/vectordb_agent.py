from qdrant_client import QdrantClient
from typing import Dict
from qdrant_client.http.models import VectorParams, Distance
from langchain.vectorstores import Qdrant
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document
from app.config import settings

class VectorDBAgent:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.QURL, 
            api_key=settings.QAPI_KEY
        )
        self.collection_name = settings.QCOLLECTION

        self.embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

        # Ensure collection exists
        try:
            self.client.get_collection(self.collection_name)
        except Exception:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=768, distance=Distance.COSINE)
            )

    def run(self, state: Dict) -> Dict:
        # Store chunks as Documents with unique IDs
        documents = [
            Document(page_content=chunk, metadata={"id": f"doc_{i}", "url": metadata["url"]})
            for i, (chunk, metadata) in enumerate(zip(state["chunks"], state["metadata"]))
        ]

        vector_store = Qdrant(
            client=self.client,
            collection_name=self.collection_name,
            embeddings=self.embeddings
        )

        vector_store.add_documents(documents)

        k = min(5, len(state["chunks"]))
        hits = vector_store.similarity_search_with_score(state["summary"], k=k)

        state["relevant_chunks"] = [hit[0].page_content for hit in hits]
        state["relevant_metadata"] = state["relevant_metadata"] = [
    hit[0].metadata.get("url", "URL Not Available") for hit in hits
]

        return state