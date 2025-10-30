// reducer.js
export const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  query: "friends",
  filters: {
    genre: "hepsi",
    language: "hepsi",
    minRating: 0,
  },
  shows: [], // raw shows from API (mapped to simple shape)
  pageSize: 6,
  page: 1,
  watchlist: [], // array of show objects
};

export const ACTIONS = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  SET_QUERY: "SET_QUERY",
  SET_FILTERS: "SET_FILTERS",
  SET_WATCHLIST: "SET_WATCHLIST",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  SET_PAGE: "SET_PAGE",
  ADD_WATCHLIST: "ADD_WATCHLIST",
  REMOVE_WATCHLIST: "REMOVE_WATCHLIST",
  CLEAR_WATCHLIST: "CLEAR_WATCHLIST",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return { ...state, isLoading: true, isError: false, errorMessage: null };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        shows: action.payload.shows,
        page: 1, // reset to first page on new fetch
      };
    case ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload?.message || "Hata oluştu",
      };
    case ACTIONS.SET_QUERY:
      return { ...state, query: action.payload, page: 1 };
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload }, page: 1 };
    case ACTIONS.SET_WATCHLIST:
      return { ...state, watchlist: action.payload };
    case ACTIONS.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, page: 1 };
    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    case ACTIONS.ADD_WATCHLIST: {
      const exists = state.watchlist.find((s) => s.id === action.payload.id);
      if (exists) return state;
      const newList = [...state.watchlist, action.payload];
      localStorage.setItem("watchlist", JSON.stringify(newList));
      return { ...state, watchlist: newList };
    }
    case ACTIONS.REMOVE_WATCHLIST: {
      const newList = state.watchlist.filter((s) => s.id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(newList));
      return { ...state, watchlist: newList };
    }
    case ACTIONS.CLEAR_WATCHLIST:
      localStorage.removeItem("watchlist");
      return { ...state, watchlist: [] };
    default:
      return state;
  }
}
