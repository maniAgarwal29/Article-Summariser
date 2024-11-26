import { useState } from "react";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    if (!url) {
      setSummary("Please enter a valid URL.");
      return;
    }

    setSummary("Please be patient, your summary is on the way...");

    const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
      url
    )}&lang=en&engine=2`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "89bd8668a3msh516a140367579bfp1ce42bjsn08c4a2d901d5",
          "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
        },
      });
      const data = await response.json();
      console.log(data)
      if (data?.summary) {
        setSummary(data.summary);
      } else {
        setSummary("Summary could not be generated.");
      }
    } catch (error) {
      setSummary("An error occurred while fetching the summary.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="main">
        <h1 className="heading">Article Summarizer</h1>
        <div className="input-div">
          <input
            type="url"
            id="url"
            placeholder="Enter article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="btn custom-btn btn-1" onClick={handleSummarize}>
            Summarize
          </button>
        </div>
        <div className="summarize-article">
          <p className="summary">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
