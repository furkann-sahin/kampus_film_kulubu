// components/Filters.jsx
import React from "react";

export default function Filters({ shows, filters, onChange }) {
  // derive unique genres and languages from shows
  const genres = new Set();
  const languages = new Set();
  shows.forEach((s) => {
    (s.genres || []).forEach((g) => genres.add(g));
    if (s.language) languages.add(s.language);
  });

  const minRatings = [0, 5, 7, 8, 9];

  return (
    <div className="filters">
      <select
        value={filters.genre}
        onChange={(e) => onChange({ genre: e.target.value })}
        className="filter-select"
      >
        <option value="hepsi">Tür (hepsi)</option>
        {[...genres].sort().map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select
        value={filters.language}
        onChange={(e) => onChange({ language: e.target.value })}
        className="filter-select"
      >
        <option value="hepsi">Dil (hepsi)</option>
        {[...languages].sort().map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      <select
        value={filters.minRating}
        onChange={(e) => onChange({ minRating: Number(e.target.value) })}
        className="filter-select"
      >
        <option value={0}>Min. Puan (0+)</option>
        {minRatings.map((r) => (
          <option key={r} value={r}>{r}+</option>
        ))}
      </select>
    </div>
  );
}
