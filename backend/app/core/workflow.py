from typing import Union
from langgraph.graph import StateGraph, END

#agents
from app.core.agents.input_agent import InputAgent
from app.core.agents.search_agent import SearchAgent
from app.core.agents.vectordb_agent import VectorDBAgent
from app.core.agents.fact_check_agent import FactCheckingAgent

#state
from app.core.state import FactCheckingState

class FactCheckingWorkflowManager:
    def __init__(self):
        self.input_agent = InputAgent()
        self.search_agent = SearchAgent()
        self.vector_db_agent = VectorDBAgent()
        self.fact_checking_agent = FactCheckingAgent()
        self.graph = self._create_workflow_graph()

    def _create_workflow_graph(self) -> StateGraph:
        workflow = StateGraph(FactCheckingState)

        def input_step(state: FactCheckingState) -> FactCheckingState:
            # Process raw input data
            state = self.input_agent.run(state)
            return state

        def search_step(state: FactCheckingState) -> FactCheckingState:
            # Fetch related articles
            state = self.search_agent.run(state)
            return state

        def vector_db_step(state: FactCheckingState) -> FactCheckingState:
            # Retrieve relevant chunks
            state = self.vector_db_agent.run(state)
            
            return state

        def fact_check_step(state: FactCheckingState) -> FactCheckingState:
            # Perform fact-checking analysis
            state = self.fact_checking_agent.run(state)
            return state

        # Add nodes to the graph
        workflow.add_node("input", input_step)
        workflow.add_node("search", search_step)
        workflow.add_node("vector_db", vector_db_step)
        workflow.add_node("fact_check", fact_check_step)

        # Define workflow edges
        workflow.set_entry_point("input")
        workflow.add_edge("input", "search")
        workflow.add_edge("search", "vector_db")
        workflow.add_edge("vector_db", "fact_check")
        workflow.add_edge("fact_check", END)

        return workflow.compile()

    def run_workflow(self, input_data: str) -> str:
        try:
            initial_state = FactCheckingState(
                input_data=input_data,
                cleaned_text=None,
                summary=None,
                search_results=None,
                chunks=None,
                embeddings=None,
                relevant_chunks=None,
                relevant_metadata=None,
                metadata=None,
                verdict=None,
                explanation=None,
                report=None,
            )

            final_state = self.graph.invoke(initial_state)

            if isinstance(final_state, dict) and final_state.get("report"):
                return final_state

        except Exception as e:
            raise e

    
