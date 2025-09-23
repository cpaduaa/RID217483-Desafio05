import { useState } from "react";
import { LivrosService } from "../../services/LivrosService";
import { useNavigate } from "react-router-dom";

export default function LivrosCadastro() {
  const [titulo, setTitulo] = useState("");
  const [num_paginas, setNumPaginas] = useState("");
  const [isbn, setIsbn] = useState("");
  const [editora, setEditora] = useState("");

  const navigate = useNavigate();

  const salvarLivro = async (e) => {
    e.preventDefault();
    try {
      await LivrosService.create({ titulo, num_paginas, isbn, editora });
      navigate("/livros");
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastrar Livro</h1>
      <form onSubmit={salvarLivro}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Páginas</label>
          <input
            type="number"
            className="form-control"
            value={num_paginas}
            onChange={(e) => setNumPaginas(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            className="form-control"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Editora</label>
          <input
            type="text"
            className="form-control"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Salvar
        </button>
      </form>
    </div>
  );
}
