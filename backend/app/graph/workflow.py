from langgraph.graph import StateGraph, START, END

from app.graph.state import DocumentState
from app.graph.nodes import upload_node, ocr_node, llm_node,preprocessing_node
from app.services.business_rules import business_rules_node


workflow = StateGraph(DocumentState)
workflow.add_node("upload", upload_node)
workflow.add_node("preprocessing", preprocessing_node)
workflow.add_node("ocr", ocr_node)
workflow.add_node("llm", llm_node)
workflow.add_node("business_rules", business_rules_node)
workflow.add_edge(START, "upload")
workflow.add_edge("upload", "preprocessing")
workflow.add_edge("preprocessing", "ocr")
workflow.add_edge("ocr", "llm")
workflow.add_edge("llm", "business_rules")
workflow.add_edge("business_rules", END)
graph = workflow.compile()