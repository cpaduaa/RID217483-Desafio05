import { useEffect, useState } from "react";
import { LivrosService } from "../../services/LivrosService";
import { Link } from "react-router-dom";


export default function Livros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    try {
      const response = await LivrosService.getAll();
      setLivros(response.data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    }
  };

  const excluirLivro = async (id) => {
    if (window.confirm("Deseja realmente excluir este livro?")) {
      try {
        await LivrosService.delete(id);
        carregarLivros();
      } catch (error) {
        console.error("Erro ao excluir livro:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Lista de Livros</h1>
      <Link to="/livros/cadastro" className="btn btn-primary mb-3">
        Novo Livro
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Número de Páginas</th>
            <th>ISBN</th>
            <th>Editora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.num_paginas}</td>
              <td>{livro.isbn}</td>
              <td>{livro.editora}</td>
              <td>
                <Link
                  to={`/livros/edicao/${livro.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => excluirLivro(livro.id)}
                  className="btn btn-danger btn-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
