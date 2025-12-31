import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";

export async function runAIUpdate(article) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in environment variables");
  }

  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const searchRes = await axios.post(
    "https://google.serper.dev/search",
    { q: article.title },
    {
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

//   const links = (searchRes.data.organic || [])
//     .slice(0, 2)
    //     .map((r) => r.link);
    const organic = searchRes.data.organic || [];

const links = organic
  .filter(r => r.link)
  .slice(0, 2)
  .map(r => r.link);

if (links.length < 2) {
  links.push("https://en.wikipedia.org/wiki/Artificial_intelligence");
}



  const scrape = async (url) => {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    $("script, style, nav, footer").remove();
    return $("body").text().replace(/\s+/g, " ").slice(0, 3000);
  };

//   const ref1 = await scrape(links[0]);
    //   const ref2 = await scrape(links[1]);
    const ref1 = (await scrape(links[0])) || article.originalContent;
const ref2 = (await scrape(links[1])) || article.originalContent;


//ai rewrite
  const prompt = `
Rewrite the original article using inspiration from reference articles.
Improve clarity and structure. Keep it original.

Original:
${article.originalContent}

Reference 1:
${ref1}

Reference 2:
${ref2}
`;

  const aiRes = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return {
    updatedContent: aiRes.choices[0].message.content,
    references: links,
  };
}
