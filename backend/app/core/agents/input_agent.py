from typing import Dict
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
import re
from app.config import settings

class InputAgent:
    def __init__(self):
        self.llm = ChatGroq(groq_api_key=settings.GROQ_API_KEY, model_name="llama-3.3-70b-versatile")

    def run(self, state: Dict) -> Dict:
        
        if state["input_data"]:
          text = state["input_data"]
          state["summary"] = self.clean_summary(text)

        return state

    def clean_summary(self, text: str) -> str:

      """
        Cleans the LLM response to return plain text.
        - Removes special characters (except basic punctuation).
        - Removes extra whitespace and newlines.
        - Ensures the response is a single line of plain text.
        """

      response = self._summarize(text)
      
      cleaned_text = re.sub(r"[^\w\s.,!?]", "", response)
      cleaned_text = re.sub(r"\s+", " ", cleaned_text)

      cleaned_text = cleaned_text.strip()
      
      return cleaned_text

    def _summarize(self, text: str) -> str:
        prompt = ChatPromptTemplate.from_template(
            '''You are given a news. You need to extract the main points of the news which can be googled to find more about it. 
            You only need to provide the summarized news in few lines, nothing more.: {text}'''
        )
        chain = prompt | self.llm
        response = chain.invoke({"text": text})
        return response.content