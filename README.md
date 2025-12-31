# BeyondChats Assignment – AI-Powered Article Enhancement System

## 🔗 Live Project Links

- **Frontend (Live Application):** https://beyondchats-snowy.vercel.app/
- **Backend (API Base URL):** https://beyondchats-ocsa.onrender.com

> The live application allows reviewers to view original articles, trigger AI updates, and verify updated articles along with cited references.
---

## Overview

This project was developed as part of the BeyondChats technical assignment.  
The objective was to build a complete end-to-end system that collects blog articles, stores them in a database, enhances them using AI by learning from top Google search results, and presents both original and updated versions through a clean frontend interface.

The work has been completed in three clearly defined phases as described in the assignment.

---

## Live Project

- **Frontend (Live):** https://beyondchats-snowy.vercel.app/
- **Backend (API):** https://beyondchats-ocsa.onrender.com

The live application allows reviewers to:
- View original articles
- Trigger AI updates
- View AI-enhanced articles along with reference links

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Frontend:** React.js (Vite)  
- **AI / LLM:** Groq (OpenAI-compatible API)  
- **Search API:** Serper (Google Search API)  
- **Deployment:**  
  - Backend → Render (Free tier)  
  - Frontend → Vercel (Free tier)

---

## Phase 1: Article Scraping & Backend APIs

### What was implemented

- Scraped the **five oldest articles** from the last page of BeyondChats blogs  
  - Source: https://beyondchats.com/blogs/
- Extracted article title and main content
- Stored articles in MongoDB
- Implemented full **CRUD APIs** for managing articles

### Available APIs

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/articles` | Create a new article |
| GET | `/api/articles` | Fetch all articles |
| GET | `/api/articles/:id` | Fetch article by ID |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |
| POST | `/api/articles/:id/ai-update` | Run AI enhancement |

---

## Phase 2: AI-Based Article Enhancement (Core Logic)

### Objective

Enhance original articles by:
- Analyzing top-ranking Google articles
- Improving formatting, clarity, and structure
- Keeping content original
- Citing reference articles clearly

### AI Enhancement Flow
1. Fetch article from backend API  
2. Search article title on Google using Serper API  
3. Select the first two external blog/article links  
4. Scrape the main readable content from those sources  
5. Send original + reference content to the LLM  
6. Generate an improved version of the article  
7. Save updated content and reference links in the database  

### LLM Choice

Gemini and OpenAI APIs had model availability and quota limitations for new accounts.  
To ensure stability and smooth execution, **Groq’s OpenAI-compatible LLM** was used, which provided reliable performance without affecting project requirements.

---

## Phase 3: Frontend Application

### Features

- Displays all articles in a clean, responsive UI
- Shows **original and AI-updated versions**
- Displays reference links used for AI enhancement
- Allows creating new articles from the UI
- Allows triggering AI enhancement directly from the frontend

The UI is intentionally kept simple and professional to make article comparison easy for reviewers.

---
## Architecture / Data Flow

React Frontend (Vercel)
|
| API Requests
v
Node.js Backend (Render)
|
| CRUD + AI Enhancement Logic
v
MongoDB Atlas
|
| External Services
v
Groq LLM + Google Search (Serper)


---

## Local Setup Instructions

### 1. Clone the Repository

bash
git clone <repository-url>
cd beyondchats


2. ##Backend Setup##
-cd backend
-npm install
-Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
GROQ_API_KEY=your_groq_api_key
SERPER_API_KEY=your_serper_api_key
-Start the backend server:
-npm run dev

Backend runs at: http://localhost:5000
3. Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

How to Use the Application:
1.Open the live frontend URL 
2.Create a new article with meaningful content
3.Open the article detail page
4.Click Run AI Update
5.Wait a few seconds for processing
6.you will be able to see updated article as well


Conclusion:

This project demonstrates a complete real-world workflow involving web scraping, REST APIs, AI-driven content enhancement, and frontend integration.
The focus was on building a reliable, readable, and production-style system rather than a simple prototype.

Thank you for reviewing my submission.
