import Article from "../models/Article.js";
import { runAIUpdate } from "../services/aiService.js";

export const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const updateArticleWithAI = async (req, res) => {
//   try {
//     const article = await Article.findById(req.params.id);
//     if (!article) {
//       return res.status(404).json({ message: "Article not found" });
//     }

//     // const { updatedContent, references } = await runAIUpdate(article);
//     runAIUpdate(article)
//   .then(async (result) => {
//     article.updatedContent = result.updatedContent;
//     article.references = result.references;
//     await article.save();
//   })
//   .catch(console.error);

// res.json({ message: "AI update started" });


//     article.updatedContent = updatedContent;
//     article.references = references;
//     await article.save();

//     res.json({
//       message: "AI update completed",
//       article,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
export const updateArticleWithAI = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const { updatedContent, references } = await runAIUpdate(article);

    article.updatedContent = updatedContent;
    article.references = references;
    await article.save();

    res.json({
      message: "AI update completed",
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
