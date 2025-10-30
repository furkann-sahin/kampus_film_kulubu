// components/TVList.jsx
import React from "react";
import TVCard from "./TVCard";

export default function TVList({ shows, onAddWatchlist, onOpenDetail }) {
  if (!shows || shows.length === 0) {
    return <div className="empty">Hiç sonuç yok.</div>;
  }

  return (
    <div className="tvlist">
      {shows.map((s) => (
        <TVCard
          key={s.id}
          show={s}
          onAddWatchlist={onAddWatchlist}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
