import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../api/api";
import "./index.scss";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [formBook, setFormBook] = useState({
    titulo: "",
    num_paginas: "",
    isbn: "",
    editora: "",
  });
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/livros");
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const handleChange = (e) => {
    setFormBook({ ...formBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    if (!formBook.titulo || !formBook.num_paginas || !formBook.isbn || !formBook.editora) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      if (editingBookId) {
        await api.put(`/livros/${editingBookId}`, formBook);
        setEditingBookId(null);
      } else {
        await api.post("/livros", formBook);
      }
      setFormBook({ titulo: "", num_paginas: "", isbn: "", editora: "" });
      fetchBooks();
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setFormBook({
      titulo: book.titulo,
      num_paginas: book.num_paginas,
      isbn: book.isbn,
      editora: book.editora,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/livros/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  return (
    <div className="home">
      <Header />
      <h1>Biblioteca Central Online - Livros</h1>

      <div className="livrosCadastro">
        <h1>{editingBookId ? "Editar Livro" : "Cadastrar Novo Livro"}</h1>
        <div className="form-group">
          <label>Título</label>
          <input
            name="titulo"
            value={formBook.titulo}
            onChange={handleChange}
          />

          <label>Número de Páginas</label>
          <input
            name="num_paginas"
            type="number"
            value={formBook.num_paginas}
            onChange={handleChange}
          />

          <label>ISBN</label>
          <input
            name="isbn"
            value={formBook.isbn}
            onChange={handleChange}
          />

          <label>Editora</label>
          <input
            name="editora"
            value={formBook.editora}
            onChange={handleChange}
          />

          <button onClick={handleAddBook}>
            {editingBookId ? "Salvar Alterações" : "Adicionar Livro"}
          </button>
        </div>
      </div>

      <div className="livros">
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.titulo}</strong>
              <span>{book.editora}</span>
              <span>{book.num_paginas} páginas</span>
              <span>ISBN: {book.isbn}</span>

              <div className="botoes">
                <button className="btn edit" onClick={() => handleEdit(book)}>
                  ✏
                </button>
                <button className="btn delete" onClick={() => handleDelete(book.id)}>
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
