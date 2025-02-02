from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from typing import Dict
from app.config import settings


class FactCheckingAgent:
    def __init__(self):
        self.llm = ChatGroq(
            groq_api_key=settings.GROQ_API_KEY, model_name="llama-3.3-70b-versatile"
        )

    def run(self, state: Dict) -> Dict:
        context = "\n".join(state["relevant_chunks"])
        urls = []

        for metadata in state["relevant_metadata"]:
            if metadata != "URL Not Available":
                urls.append(metadata)

        # prompt = ChatPromptTemplate.from_template(
        #     """
        #     You are a professional news authenticity analyst. You will be given a news claim and the context taken from the Google while searching for that news.
        #     The context may or may not be relevant. So it is your job to read both the news and the context and tell whether the news is fake or real.
        #     Decide very strictly, match the context, every event mentioned in the news must be there in context otherwise it is only partially correct.
        #     If something seems confusing or misleading, you can frame a one line answer what you think about the news.
        #     You need to answer it directly in the format:
        #     Verdict: your answer (Real, Fake or partially correct as per your reasoning)
        #     Explanation: your reasoning (short and crisp series of thinking)
        #     Relevent URLS: Mention all the urls

        #     News: {news}
        #     Context: {context}
        #     URLs: {urls}
        #     """
        # )

        prompt = ChatPromptTemplate.from_template(
            """
              Role: You are a Senior News Verification Specialist with expertise in fact-checking and media literacy.

              Task:
              Analyze the following news claim against provided search context (from Google) to determine its authenticity. Your analysis must follow strict verification protocols:

              Verification Protocol:
              **1. Claim Breakdown**
              - Identify all factual assertions in the news claim
              - List key entities (people, organizations, locations)
              - Note statistics, dates, and quoted statements

              **2. Context Cross-Verification**
              - Match each factual element to contextual evidence
              - Flag discrepancies in:
                - Numbers/data
                - Chronology of events
                - Quotes/attributions
              - Identify potential logical fallacies or emotional language

              **3. Source Evaluation**
              - Rate source credibility of contextual URLs using:
                - **Tier 1**: Established news outlets (AP, Reuters, BBC)
                - **Tier 2**: Regional/local verified sources
                - **Tier 3**: Blogs/opinion pieces (mark as low credibility)
              - Check for corroboration across multiple high-tier sources

              **4. Conflict Resolution**
              - If context contains conflicting information:
                - Favor most recent Tier 1 sources
                - Note geographic relevance of sources
                - Check official statements/primary documents

              **Output Format:**

              **Verdict:** [Real | Partially Verified | Not Proven | False]
              **Confidence Level:** [High/Medium/Low]  

              **Analysis:**  
              1. **Verified Elements:** [List confirmed facts with sources]  
              2. **Unverified Elements:** [List unsupported claims]  
              3. **Contradictions:** [Detail conflicting information]  

              **Relevant URLs:**  
              - **[Tier 1 Source]** - [Brief relevance note]  
              - **[Tier 2 Source]** - [Contextual limitation]  

                News: {news}
                Context: {context}
                URLs: {urls}
          """
        )
        chain = prompt | self.llm
        response = chain.invoke(
            {"news": state["summary"], "context": context, "urls": "\n".join(urls)}
        )

        result = response.content
        state["report"] = result
        return state
