from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
import os

from langchain.agents import Tool, initialize_agent
from langchain.agents.agent_types import AgentType
from langchain.llms import HuggingFacePipeline
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from langchain import PromptTemplate, LLMChain

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
from huggingface_hub import login
from google.colab import userdata

# Retrieve the secret value
HF_TOKEN = userdata.get('HF_TOKEN')
login(HF_TOKEN)
os.environ["HUGGINGFACEHUB_API_TOKEN"] = HF_TOKEN

model_id = "mistralai/Mistral-7B-Instruct-v0.1"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype="auto")

pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, max_length=512)
llm = HuggingFacePipeline(pipeline=pipe)




prompt = PromptTemplate.from_template(
    "Given this user query: '{query}', return a keyword and type to filter listings."
)

chain = LLMChain(llm=llm, prompt=prompt)

GOOGLE_API_KEY = userdata.get('MAPS_API_KEY')
LISTINGS_API_URL = "https://clear-dodos-double.loca.lt/api/mocklistings"

# Input model for request
class QueryInput(BaseModel):
    user_query: str
def has_nearby_place(lat, lng, keyword, place_type, radius=500):
    url = (
        f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
        f"location={lat},{lng}&radius={radius}&keyword={keyword}&type={place_type}&key={GOOGLE_API_KEY}"
    )
    try:
        res = requests.get(url)
        results = res.json().get("results", [])
        return len(results) > 0
    except Exception as e:
        print("Google Places API error:", e)
        return False

def fetch_listings():
    try:
        res = requests.get(LISTINGS_API_URL)
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print("Failed to fetch listings:", e)
        return []

@app.post("/query")
async def query_agent(input_data: QueryInput):
    parsed = chain.run({"query": input_data.user_query})

    # naive parse: 'Keyword: X\nType: Y'
    lines = parsed.strip().split("\n")
    keyword = lines[0].split(":")[-1].strip().strip("'").strip("\"")
    place_type = lines[1].split(":")[-1].strip().strip("'").strip("\"")

    filtered = []
    for listing in fetch_listings():
        if has_nearby_place(listing["lat"], listing["lng"], keyword, place_type):
            filtered.append(listing)

    return {"keyword": keyword, "type": place_type, "listings": filtered}

