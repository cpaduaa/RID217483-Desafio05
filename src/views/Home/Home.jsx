import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../api/api";
import "./index.scss";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [formBook, setFormBook] = useState({
    title: "",
    pages: "",
    isbn: "",
    publisher: "",
  });
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleChange = (e) => {
    setFormBook({ ...formBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    if (!formBook.title || !formBook.pages || !formBook.isbn || !formBook.publisher) {
      alert("Please fill all fields!");
      return;
    }

    try {
      if (editingBookId) {
        await api.put(`/books/${editingBookId}`, formBook);
        setEditingBookId(null);
      } else {
        await api.post("/books", formBook);
      }
      setFormBook({ title: "", pages: "", isbn: "", publisher: "" });
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setFormBook({
      title: book.title,
      pages: book.pages,
      isbn: book.isbn,
      publisher: book.publisher,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
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
          <input name="title" value={formBook.title} onChange={handleChange} />

          <label>Número de Páginas</label>
          <input name="pages" type="number" value={formBook.pages} onChange={handleChange} />

          <label>ISBN</label>
          <input name="isbn" value={formBook.isbn} onChange={handleChange} />

          <label>Editora</label>
          <input name="publisher" value={formBook.publisher} onChange={handleChange} />

          <button onClick={handleAddBook}>
            {editingBookId ? "Salvar Alterações" : "Adicionar Livro"}
          </button>
        </div>
      </div>

      <div className="livros">
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong>
              <span>{book.publisher}</span>
              <span>{book.pages} páginas</span>
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
