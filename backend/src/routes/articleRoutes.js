import express from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  updateArticleWithAI,
} from "../controllers/articleController.js";

const router = express.Router();

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

router.post("/:id/ai-update", updateArticleWithAI);

export default router;
