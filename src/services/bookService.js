import api from './api';

export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (book) => {
  const response = await api.post('/books', book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await api.put(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
