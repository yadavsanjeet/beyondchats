import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;
const BACKEND_API = process.env.BACKEND_API_URL;

const openai = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Google Search
async function googleSearch(query) {
  const res = await axios.post(
    "https://google.serper.dev/search",
    { q: query },
    {
      headers: {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  return (res.data.organic || []).slice(0, 2).map(r => r.link);
}

//scrape
async function scrapeContent(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    $("script, style, nav, footer").remove();
    return $("body").text().replace(/\s+/g, " ").slice(0, 3000);
  } catch {
    return "";
  }
}

//using LLM to rewrite
async function rewriteWithGroq(original, ref1, ref2) {
  const prompt = `
Rewrite the original article using inspiration from reference articles.
Improve structure, clarity, and formatting.
Keep content original.

Original:
${original}

Reference 1:
${ref1}

Reference 2:
${ref2}
`;

  const res = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content;
}

async function run() {
  console.log("AI Script started");

  const articles = (await axios.get(`${BACKEND_API}/articles`)).data;
  if (!articles.length) return console.log("No articles found");

  const article = articles[0];
  console.log("Processing:", article.title);

  const links = await googleSearch(article.title);
  const ref1 = await scrapeContent(links[0]);
  const ref2 = await scrapeContent(links[1]);

  const updatedContent = await rewriteWithGroq(
    article.originalContent,
    ref1,
    ref2
  );

  await axios.put(`${BACKEND_API}/articles/${article._id}`, {
    updatedContent,
    references: links,
  });

  console.log("Article updated successfully!");
}

run();
