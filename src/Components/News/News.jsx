import React, { useState, useEffect } from "react";
import "../News/News.css"; // Make sure the file path is correct

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles${
            searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""
          }`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setArticles(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchTerm(formData.get("search"));
  };

  const handleHome = () => {
    setSearchTerm("");
  };

  return (
    <div className="news-container">
      <header className="news-header">
        <div className="header-content">
          <div className="title-container">
            <div className="rocket-icon"></div>
            <h1 className="main-title">Rocket Reports</h1>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <span className="search-icon"></span>
              <input
                type="text"
                name="search"
                placeholder="Search space news..."
                defaultValue={searchTerm}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                className="home-button"
                onClick={handleHome}
              >
                Home
              </button>
            )}
          </form>
        </div>
      </header>

      <main className="news-main">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="error-container">
            <p className="error-message">No articles found.</p>
          </div>
        ) : (
          <div className="news-grid">
            {articles.map((article, index) => (
              <article key={index} className="news-card">
                <div className="news-card-image">
                  <img
                    src={article.image_url || "/placeholder.png"}
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="news-card-content">
                  <div className="news-meta">
                    <span className="news-date">
                      {new Date(article.published_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <span className="news-source">{article.news_site}</span>
                  </div>
                  <h2 className="news-title">{article.title}</h2>
                  <p className="news-description">{article.summary}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
