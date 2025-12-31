import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchArticles = () => API.get("/articles");
export const fetchArticleById = (id) => API.get(`/articles/${id}`);
export const createArticle = (data) => API.post("/articles", data);
export const runAIUpdate = (id) => API.post(`/articles/${id}/ai-update`);

