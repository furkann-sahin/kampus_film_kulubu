import SearchBox from "./SearchBox";
import Filters from "./Filters";
import TVList from "./TVList";
import WatchlistPanel from "./WatchlistPanel";
import Pagination from "./Pagination";
import ShowDetail from "./ShowDetail";
import Footer from "./Footer";
import React, { useEffect, useReducer, useState } from "react";
import { searchShows } from "./api";
import { initialState, reducer, ACTIONS } from "./reducer";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, filters, shows, isLoading, isError, errorMessage, pageSize, page, watchlist } = state;
  const [detailId, setDetailId] = useState(null);

  // load watchlist from localStorage once
  useEffect(() => {
    const raw = localStorage.getItem("watchlist");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        dispatch({ type: ACTIONS.SET_WATCHLIST, payload: parsed });
      } catch { }
    }
  }, []);

  // fetch shows when query changes
  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      dispatch({ type: ACTIONS.FETCH_INIT });
      try {
        const shows = await searchShows(query);
        if (cancelled) return;
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { shows } });
      } catch (err) {
        if (!cancelled) {
          dispatch({ type: ACTIONS.FETCH_FAILURE, payload: { message: err.message } });
        }
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, [query]);

  // handlers
  const handleSearch = (q) => dispatch({ type: ACTIONS.SET_QUERY, payload: q });
  const handleFilterChange = (partial) => dispatch({ type: ACTIONS.SET_FILTERS, payload: partial });
  const handleAddWatchlist = (show) => dispatch({ type: ACTIONS.ADD_WATCHLIST, payload: show });
  const handleRemoveWatchlist = (id) => dispatch({ type: ACTIONS.REMOVE_WATCHLIST, payload: id });
  const handleClearWatchlist = () => dispatch({ type: ACTIONS.CLEAR_WATCHLIST });
  const handleSetPage = (p) => dispatch({ type: ACTIONS.SET_PAGE, payload: p });

  // apply filters
  const filtered = shows.filter((s) => {
    if (!s) return false;
    if (filters.genre !== "hepsi" && !(s.genres || []).includes(filters.genre)) return false;
    if (filters.language !== "hepsi" && s.language !== filters.language) return false;
    const rating = s.rating?.average ?? 0;
    if (rating < (filters.minRating || 0)) return false;
    return true;
  });

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(startIdx, startIdx + pageSize);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-flex">
          <h1 className="header-title">Kampüs Film Kulübü</h1>
          <a href="/" className="header-home-link">Ana Sayfa</a>
        </div>
        <div className="controls-row">
          <SearchBox query={query} onSearch={handleSearch} />
          <Filters shows={shows} filters={filters} onChange={handleFilterChange} />
        </div>
      </header>

      <main className="main-content">
        <section className="list-panel">
          {isLoading && <div className="spinner">Yükleniyor...</div>}
          {isError && (
            <div className="error">
              <div>Hata: {errorMessage}</div>
              <button className="btn" onClick={() => dispatch({ type: ACTIONS.SET_QUERY, payload: query })}>Tekrar dene</button>
            </div>
          )}
          {!isLoading && !isError && (
            <>
              <TVList shows={pageItems} onAddWatchlist={handleAddWatchlist} onOpenDetail={(id) => setDetailId(id)} />
              <Pagination total={total} pageSize={pageSize} page={currentPage} onSetPage={handleSetPage} />
            </>
          )}
        </section>

        <div className="right-panel">
          <WatchlistPanel watchlist={watchlist} onRemove={handleRemoveWatchlist} onClear={handleClearWatchlist} />
        </div>
      </main>

      <Footer />

      {detailId && <div className="modal"><ShowDetail showId={detailId} onClose={() => setDetailId(null)} /></div>}
    </div>
  );
}
