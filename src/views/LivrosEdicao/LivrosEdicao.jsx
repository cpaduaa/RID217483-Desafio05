import { useEffect, useState } from "react";
import { LivrosService } from "../../services/LivrosService";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";

export default function LivrosEdicao() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [num_paginas, setNumPaginas] = useState("");
  const [isbn, setIsbn] = useState("");
  const [editora, setEditora] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    carregarLivro();
  }, []);

  const carregarLivro = async () => {
    try {
      const response = await LivrosService.getById(id);
      const livro = response.data;
      setTitulo(livro.titulo);
      setNumPaginas(livro.num_paginas);
      setIsbn(livro.isbn);
      setEditora(livro.editora);
    } catch (error) {
      console.error("Erro ao carregar livro:", error);
    }
  };

  const atualizarLivro = async (e) => {
    e.preventDefault();
    try {
      await LivrosService.update(id, { titulo, num_paginas, isbn, editora });
      navigate("/livros");
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  };

  return (
    <div className="livrosCadastro">
      <h1>Edição de Livros</h1>
      <form onSubmit={atualizarLivro}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Número de Páginas</label>
          <input
            type="number"
            value={num_paginas}
            onChange={(e) => setNumPaginas(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Editora</label>
          <input
            type="text"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Atualizar Livro</button>
        </div>
      </form>
    </div>
  );
}
