// components/SearchBox.jsx
import React, { useState } from "react";

export default function SearchBox({ query, onSearch }) {
  const [q, setQ] = useState(query || "");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim() || "friends");
  };

  return (
    <form onSubmit={submit} className="searchbox">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Dizi ara... (örn. star, batman)"
        className="search-input"
        aria-label="search"
      />
      <button type="submit" className="btn btn-primary">Ara</button>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => {
          setQ("");
          onSearch("friends");
        }}
      >
        Sıfırla
      </button>
    </form>
  );
}
