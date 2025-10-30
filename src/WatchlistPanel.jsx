// components/WatchlistPanel.jsx
import React from "react";

export default function WatchlistPanel({ watchlist, onRemove, onClear }) {
  return (
    <aside className="watchlist-panel">
      <h4>Gösterime Girecekler ({watchlist.length})</h4>
      {watchlist.length === 0 ? (
        <div className="empty">Listeye eklenmiş yapım yok.</div>
      ) : (
        <ul className="watchlist-items">
          {watchlist.map((s) => (
            <li key={s.id} className="watch-item">
              <div className="wl-left">
                <img src={s.image?.medium || ""} alt={s.name} className="wl-thumb" />
                <div>
                  <div className="wl-title">{s.name}</div>
                  <div className="wl-meta">{s.language} • {s.rating?.average ?? "-"}</div>
                </div>
              </div>
              <div>
                <button className="btn btn-sm" onClick={() => onRemove(s.id)}>Çıkar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="watchlist-footer">
        <button className="btn btn-ghost" onClick={onClear} disabled={watchlist.length === 0}>Listeyi Temizle</button>
      </div>
    </aside>
  );
}
