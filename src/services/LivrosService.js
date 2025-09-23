import axios from "axios";

const API_URL = "http://localhost:3000/livros";

export const LivrosService = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  create: (livro) => axios.post(API_URL, livro),
  update: (id, livro) => axios.put(`${API_URL}/${id}`, livro),
  delete: (id) => axios.delete(`${API_URL}/${id}`),
};
