import { useState } from "react";
import { createArticle } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createArticle({
        title,
        originalContent: content,
      });

      alert("Article uploaded successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to upload article");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "30px" }}>
      <h1>Create New Article</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Original Content</label>
          <textarea
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Upload Article
        </button>
      </form>
    </div>
  );
}
