"""
LangGraph-based RAG engine for ingredient analysis.
"""

from typing import List, TypedDict
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langgraph.graph import START, StateGraph

from backend.config import CHAT_MODEL


class IngredientAnalysisState(TypedDict):
    """State for the ingredient analysis workflow."""
    cereal_name: str
    ingredients: str
    question: str
    context: List[Document]
    analysis: str


class IngredientAnalyzer:
    """LangGraph-based ingredient analyzer using RAG."""
    
    def __init__(self, retriever, openai_api_key: str, retrieval_strategy: str = "naive"):
        """
        Initialize the ingredient analyzer.
        
        Args:
            retriever: Vector store retriever
            openai_api_key: OpenAI API key
            retrieval_strategy: Name of the retrieval strategy being used
        """
        self.retriever = retriever
        self.retrieval_strategy = retrieval_strategy
        self.llm = ChatOpenAI(
            model=CHAT_MODEL,
            api_key=openai_api_key,
            temperature=0.3  # Slightly lower for more consistent analysis
        )
        
        # Create the analysis prompt
        self.analysis_prompt = ChatPromptTemplate.from_template("""
You are a pediatric nutrition expert helping parents understand food ingredients for their children.

You have access to FDA food labeling guidelines and nutritional information. Use this context to provide accurate, evidence-based analysis.

Cereal Product: {cereal_name}
Ingredients List: {ingredients}

Question: {question}

Relevant Guidelines and Information:
{context}

IMPORTANT: Structure your response in the following format:

## VERDICT: [GOOD ✅ or MODERATE ⚠️ or BAD ❌]

**Quick Summary:** [1-2 sentences explaining the verdict]

VERDICT CLASSIFICATION RULES:
- **GOOD ✅**: Mostly whole, natural ingredients with minimal processing. No added sugars or artificial ingredients.
- **MODERATE ⚠️**: Good base ingredients BUT contains added sugars (sugar, cane sugar, brown sugar, corn syrup, high fructose corn syrup, honey, etc.) OR has some processed ingredients. Not terrible, but not ideal for regular consumption.
- **BAD ❌**: Contains artificial colors, flavors, preservatives, excessive sugar, or highly processed ingredients harmful to children.

CRITICAL: If the product contains ANY form of added sugar (sugar, cane sugar, brown sugar, honey, corn syrup, high fructose corn syrup, molasses, etc.) even if other ingredients are wholesome, classify it as MODERATE ⚠️ and explicitly mention the added sugar concern.

---

## Detailed Analysis

### 1. Overall Assessment
Is this product generally safe and healthy for children? Provide a balanced view considering:
- Base ingredients quality
- Presence of added sugars (CRITICAL for classification)
- Artificial vs natural ingredients
- Processing level

### 2. Added Sugar Analysis (CRITICAL)
**ALWAYS check for added sugars first!**
- Does this product contain added sugars? (sugar, cane sugar, brown sugar, honey, corn syrup, high fructose corn syrup, molasses, etc.)
- If YES, explain the concern: "This product contains [type of sugar], which counts as added sugar. The American Heart Association recommends children ages 2-18 should have less than 25g (6 teaspoons) of added sugar per day. Added sugars provide empty calories and can contribute to obesity, tooth decay, and unhealthy eating habits."
- Even if other ingredients are excellent, added sugars automatically make this MODERATE ⚠️

### 3. Ingredient-by-Ingredient Breakdown
For each ingredient or category of ingredients:
- **Ingredient Name**: Good/Concerning/Neutral
  - Explanation based on nutritional science and FDA guidelines
  - Any specific concerns for children
  - Nutritional benefits (if applicable)

### 4. Key Concerns
- **Added Sugars**: If present, always list as the #1 concern
- Other problematic ingredients parents should be aware of
- Explain why they might be concerning
- Provide important context

### 5. Positive Aspects
- Beneficial ingredients and their nutritional value
- Whole grains, fiber, protein, vitamins
- What makes this product have redeeming qualities

Be honest, clear, and evidence-based. Focus on added sugars as the primary factor that moves products from GOOD to MODERATE.

Remember: Start with the clear VERDICT (GOOD ✅, MODERATE ⚠️, or BAD ❌) and quick summary at the top!
""")
        
        # Build the LangGraph workflow
        self.graph = self._build_graph()
    
    def _retrieve(self, state: IngredientAnalysisState) -> dict:
        """
        Retrieve relevant documents from the knowledge base.
        
        Args:
            state: Current workflow state
            
        Returns:
            Updated state with retrieved context
        """
        retrieved_docs = self.retriever.invoke(state["question"])
        return {"context": retrieved_docs}
    
    def _generate_analysis(self, state: IngredientAnalysisState) -> dict:
        """
        Generate ingredient analysis using LLM.
        
        Args:
            state: Current workflow state
            
        Returns:
            Updated state with analysis
        """
        # Format context from retrieved documents
        context_text = "\n\n".join([
            f"Source {i+1}:\n{doc.page_content}"
            for i, doc in enumerate(state["context"])
        ])
        
        # Generate analysis
        messages = self.analysis_prompt.format_messages(
            cereal_name=state["cereal_name"],
            ingredients=state["ingredients"],
            question=state["question"],
            context=context_text
        )
        
        response = self.llm.invoke(messages)
        return {"analysis": response.content}
    
    def _build_graph(self) -> StateGraph:
        """
        Build the LangGraph workflow.
        
        Returns:
            Compiled graph
        """
        # Create graph
        graph_builder = StateGraph(IngredientAnalysisState)
        
        # Add nodes
        graph_builder.add_node("retrieve", self._retrieve)
        graph_builder.add_node("analyze", self._generate_analysis)
        
        # Add edges
        graph_builder.add_edge(START, "retrieve")
        graph_builder.add_edge("retrieve", "analyze")
        
        # Compile and return
        return graph_builder.compile()
    
    def analyze_ingredients(self, cereal_name: str, ingredients: str) -> str:
        """
        Analyze ingredients for a cereal product.
        
        Args:
            cereal_name: Name of the cereal product
            ingredients: Comma-separated list of ingredients
            
        Returns:
            Detailed ingredient analysis
        """
        print(f"Using retrieval strategy: {self.retrieval_strategy}")
        
        # Create the question for retrieval
        question = f"""
        Analyze these food ingredients for a children's cereal product: {ingredients}
        
        Consider:
        - Are these ingredients safe for children?
        - Are there any concerning additives, preservatives, or artificial ingredients?
        - What do terms like "Natural Flavors" really mean?
        - Are there any allergens or ingredients that commonly cause issues?
        - What are the nutritional benefits or concerns?
        """
        
        # Initial state
        initial_state = {
            "cereal_name": cereal_name,
            "ingredients": ingredients,
            "question": question,
            "context": [],
            "analysis": ""
        }
        
        # Run the graph
        result = self.graph.invoke(initial_state)
        
        return result["analysis"]

