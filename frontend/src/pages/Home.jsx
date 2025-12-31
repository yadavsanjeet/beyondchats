import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch articles");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Loading articles...</h3>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "30px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>BeyondChats Articles</h1>

        <Link to="/create">
          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Create New Article
          </button>
        </Link>
      </div>

      {/* Articles List */}
      {articles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        articles.map((article) => (
          <div
            key={article._id}
            style={{
              padding: "18px",
              marginBottom: "15px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{article.title}</h3>

            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              {article.updatedContent
                ? "AI-enhanced article available"
                : "Original article"}
            </p>

            <Link
              to={`/articles/${article._id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Read Article →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
