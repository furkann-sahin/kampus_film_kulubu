import React, { useEffect, useState } from "react";
import api from "./api";

export default function ShowDetail({ showId, onClose }) {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchDetail() {
      setLoading(true);
      setErr(null);
      try {
        const [detailRes, epsRes] = await Promise.all([
          api.get(`/shows/${showId}`),
          api.get(`/shows/${showId}/episodes`),
        ]);
        if (!cancelled) {
          console.log('Show detail:', detailRes.data);
          setShow(detailRes.data);
          setEpisodes(epsRes.data || []);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setErr(error.message || "Hata");
          setLoading(false);
        }
      }
    }
    fetchDetail();
    return () => { cancelled = true; };
  }, [showId]);

  if (loading) return <div className="spinner">Yükleniyor...</div>;
  if (err) return <div className="error">Detay yüklenemedi. {err}</div>;
  if (!show) return <div className="error">Dizi detayı bulunamadı.</div>;

  // Etiketler
  const tags = [
    ...(show.genres || []).map(g => ({ label: g, color: "#f7f6e7" })),
    show.language ? { label: show.language, color: "#e0f7fa", icon: "🌐" } : null,
    show.rating?.average ? { label: show.rating.average, color: "#fffde4", icon: "⭐" } : null,
    show.status ? { label: show.status, color: "#d1fae5" } : null,
    show.premiered ? { label: show.premiered, color: "#ffe9b3", icon: "📅" } : null,
  ].filter(Boolean);

  return (
    <div className="showdetail-box">
      <div className="showdetail-nav-flex">
        <div className="showdetail-nav-left">
          <a href="/" className="showdetail-nav-link">Kampüs Film Kulübü</a>
        </div>
        <div className="showdetail-nav-center">
          <button className="showdetail-back" onClick={onClose}>&larr; Geri</button>
        </div>
        <div className="showdetail-nav-right"></div>
      </div>
      <div className="showdetail-main">
        <div className="showdetail-poster">
          <img src={show.image?.original || show.image?.medium} alt={show.name} />
        </div>
        <div className="showdetail-content">
          <h2 className="showdetail-title">{show.name}</h2>
          <div className="showdetail-tags">
            {tags.map((tag, i) => (
              <span key={i} className="showdetail-tag" style={{ background: tag.color }}>
                {tag.icon && <span style={{ marginRight: 4 }}>{tag.icon}</span>}
                {tag.label}
              </span>
            ))}
          </div>
          <div className="showdetail-summary" dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
      </div>
      <div className="showdetail-episodes">
        <h3>Bölümler</h3>
        <div className="showdetail-episode-list">
          {episodes.map((ep) => (
            <div key={ep.id} className="showdetail-episode-item">
              <div className="episode-main-info">
                <div className="episode-title">
                  <span className="episode-season">S{ep.season}</span>
                  <span className="episode-name">{ep.name}</span>
                </div>
                <div className="episode-meta">
                  <span className="episode-number"># {ep.number}</span>
                  <span className="episode-date">{ep.airdate}</span>
                  <span className="episode-duration">{ep.runtime} dk</span>
                  <a href={ep.url} target="_blank" rel="noopener noreferrer" className="episode-source">
                    Kaynak
                  </a>
                </div>
              </div>
              {ep.summary && (
                <div className="episode-summary" dangerouslySetInnerHTML={{ __html: ep.summary }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
