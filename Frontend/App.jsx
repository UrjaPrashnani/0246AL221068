
import React, { useState } from "react";
import { createLogger } from "./loggerMiddleware";

const logger = createLogger();

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [logs, setLogs] = useState([]);

  function handleShorten(e) {
    e.preventDefault();
    if (!url.startsWith("http")) {
      logger.log("ERROR", { reason: "Invalid URL", input: url });
      alert("Enter a valid URL starting with http/https");
      return;
    }
    const fakeShort = window.location.origin + "/r/" + Math.random().toString(36).slice(2, 7);
    setShortUrl(fakeShort);
    logger.log("SHORTEN", { original: url, short: fakeShort });
    setLogs(logger.getLogs());
    setUrl("");
  }

  function handleCopy() {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      logger.log("COPY", { shortUrl });
      setLogs(logger.getLogs());
      alert("Copied to clipboard!");
    }
  }

  function handleClearLogs() {
    logger.clearLogs();
    setLogs([]);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React URL Shortener</h1>

      <form onSubmit={handleShorten} className="space-y-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
          <button onClick={handleCopy} className="mt-2 border px-3 py-1 rounded">Copy</button>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-6">Logs</h2>
      <button onClick={handleClearLogs} className="text-sm mb-2 border px-3 py-1 rounded">Clear Logs</button>
      <ul className="mt-2 border rounded p-3 max-h-40 overflow-auto text-sm">
        {logs.map((l) => (
          <li key={l.id}>
            <b>{l.action}</b> - {new Date(l.timestamp).toLocaleTimeString()}  
            <pre className="text-xs">{JSON.stringify(l.details)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
