# 🗺️ MapMyStay

**MapMyStay** is an AI-powered accommodation discovery app that lets users find listings using natural language queries. It integrates Google Maps and OpenAI-powered agents to filter stays by proximity (like “Close to Indian restaurants, Near a Park”) and custom amenities (like “balcony” or “gym”) — making travel planning easier and smarter.

---

## 🌟 Features

- 🔍 **LLM-based Search**  
  Users can type natural queries like:  
  _“Show me listings near Times Square with a balcony”_

- 📍 **Google Maps Integration**  
  Listings appear on an interactive map

- 🏘️ **Listing Cards & Detail Pages**  
  Each listing shows images, amenities, rating stars, and coordinates

- ⚡ **Dynamic Filters**  
  AI extracts keywords like "gym", "wifi", "balcony" from the prompt

- 📦 **PostgreSQL + Sequelize ORM**  
  Persistent data storage and real-time updates

- 💬 **Backend API with Express.js**

---

## 🧠 Tech Stack

| Layer     | Tech Used                         |
|-----------|-----------------------------------|
| Frontend  | Next.js (App Router), Tailwind CSS |
| Backend   | Node.js, Express.js               |
| Database  | PostgreSQL, Sequelize ORM         |
| AI Layer  | OpenAI + LangChain MCP            |
| Map API   | Google Maps + Places API          |

---

### Example Prompts
“Find listings near Indian restaurants with a gym”

“Show apartments with balcony close to Central Park”

“I want a cheap place with wifi and parking in Brooklyn”

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/mapmystay.git
cd mapmystay
# Navigate to each folder and install dependencies

cd backend
npm install
# Create a .env file in backend with DB and API keys
npm run dev

# Open a new terminal
cd frontend
npm install
# Create a .env.local file in frontend with API URLs
npm run dev

```bash

## Features

- 🔍 Natural language filtering for listings
- 📍 Map-based listing visualization
- 🧠 LLM-powered intelligent search
