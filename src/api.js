import axios from "axios";

// API istemcisini oluştur
const api = axios.create({
  baseURL: "https://api.tvmaze.com",
  timeout: 10000,
});

// API fonksiyonları
export const searchShows = async (query) => {
  const response = await api.get(`/search/shows?q=${encodeURIComponent(query)}`);
  return response.data.map(item => item.show);
};

export const getShowById = async (id) => {
  const response = await api.get(`/shows/${id}`);
  return response.data;
};

export const getEpisodesByShowId = async (id) => {
  const response = await api.get(`/shows/${id}/episodes`);
  return response.data;
};

// Varsayılan olarak api nesnesini dışa aktar
export default api;
