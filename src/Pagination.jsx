// components/Pagination.jsx
import React from "react";

export default function Pagination({ total, pageSize, page, onSetPage }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const go = (p) => {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    onSetPage(p);
  };

  return (
    <div className="pagination">
      <button className="btn" onClick={() => go(1)} disabled={page === 1}>İlk</button>
      <button className="btn" onClick={() => go(page - 1)} disabled={page === 1}>Geri</button>
      <span className="page-info">Sayfa {page} / {totalPages}</span>
      <button className="btn" onClick={() => go(page + 1)} disabled={page === totalPages}>İleri</button>
      <button className="btn" onClick={() => go(totalPages)} disabled={page === totalPages}>Son</button>
    </div>
  );
}
