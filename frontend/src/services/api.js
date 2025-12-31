import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
});

export const fetchArticles = () => api.get("/articles");
export const fetchArticleById = (id) => api.get(`/articles/${id}`);
export const createArticle = (data) => api.post("/articles", data);
export const runAIUpdate = (id) => api.post(`/articles/${id}/ai-update`);

export default api;
