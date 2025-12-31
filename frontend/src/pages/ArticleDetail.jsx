import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, runAIUpdate } from "../services/api";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiRunning, setAiRunning] = useState(false);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      const res = await fetchArticleById(id);
      setArticle(res.data);
      setLoading(false);
    } catch {
      alert("Failed to load article");
      setLoading(false);
    }
  };

  const handleAIUpdate = async () => {
  try {
    setAiRunning(true);

    await runAIUpdate(article._id);

    //wait for backend AI to finish , then only we will be able to show it in frontend
    setTimeout(async () => {
      await loadArticle();
      setAiRunning(false);
      alert("AI update completed");
    }, 8000); 
    
  } catch {
    setAiRunning(false);
    alert("AI update failed");
  }
};



  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      {/* Title */}
      <h1 style={{ marginBottom: "10px" }}>{article.title}</h1>

      {/* AI Update Button */}
      <button
        onClick={handleAIUpdate}
        disabled={aiRunning}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          backgroundColor: aiRunning ? "#9ca3af" : "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: aiRunning ? "not-allowed" : "pointer",
        }}
      >
        {aiRunning ? "Running AI..." : "Run AI Update"}
      </button>

      {/* Original Article */}
      <h2>Original Article</h2>
      <p style={{ whiteSpace: "pre-wrap", marginBottom: "25px" }}>
        {article.originalContent}
      </p>

      {/* Updated Article */}
      {article.updatedContent && (
        <>
          <h2>Updated Article</h2>
          <p style={{ whiteSpace: "pre-wrap", marginBottom: "25px" }}>
            {article.updatedContent}
          </p>
        </>
      )}

      {/* References */}
      {article.references?.length > 0 && (
        <>
          <h3>References</h3>
          <ul>
            {article.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2563eb" }}
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
