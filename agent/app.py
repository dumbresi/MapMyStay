# app.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
from langchain.agents import Tool, initialize_agent
from langchain.agents.agent_types import AgentType
from langchain.llms import HuggingFaceHub
import os

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your Hugging Face token
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "your_huggingface_token_here"

# LangChain LLM (DeepSeek via HuggingFace)
llm = HuggingFaceHub(
    repo_id="deepseek-ai/deepseek-coder-6.7b-instruct",
    model_kwargs={"temperature": 0.3, "max_length": 512}
)

# Define the tool to call your backend API (mocklistings with query params)
def get_listings_api_call(query_url: str) -> str:
    try:
        response = requests.get(query_url)
        if response.status_code == 200:
            listings = response.json()
            return f"Found {len(listings)} listings matching the query."
        else:
            return f"Failed to fetch listings: {response.status_code}"
    except Exception as e:
        return f"Error calling API: {str(e)}"

# Tool description for the agent to reason about
tools = [
    Tool(
        name="get_listings_near_place",
        func=get_listings_api_call,
        description="Use this tool to find listings near places. Append search keywords to the base URL like 'http://localhost:3001/mocklistings?keyword=Indian'"
    )
]

# Input model for request
class QueryInput(BaseModel):
    user_query: str

@app.post("/query")
async def query_agent(input_data: QueryInput):
    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True
    )
    result = agent.run(input_data.user_query)
    return {"result": result}
