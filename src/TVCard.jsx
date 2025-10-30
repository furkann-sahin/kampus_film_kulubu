// components/TVCard.jsx
import React from "react";

export default function TVCard({ show, onAddWatchlist, onOpenDetail }) {
  const { name, image, genres = [], language, rating = {}, summary, id } = show;
  const shortSummary = summary ? summary.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 140) + (summary.replace(/<\/?[^>]+(>|$)/g, "").length > 140 ? "..." : "") : "Özet yok";

  return (
    <div className="tvcard">
      <div className="poster">
        {image && image.medium ? (
          <img src={image.medium} alt={name} />
        ) : (
          <div className="placeholder">Poster Yok</div>
        )}
      </div>
      <div className="card-body">
        <h3 className="title">{name}</h3>
        <div className="meta">
          {genres.slice(0, 3).map((g) => <span key={g} className="tag">{g}</span>)}
          {language && <span className="tag">{language}</span>}
          {rating && rating.average && <span className="rating">★ {rating.average}</span>}
        </div>
        <p className="summary">{shortSummary}</p>
        <div className="card-actions">
          <button className="btn btn-outline" onClick={() => onOpenDetail(id)}>Detay</button>
          <button className="btn btn-primary" onClick={() => onAddWatchlist(show)}>Gösterime Ekle</button>
        </div>
      </div>
    </div>
  );
}
