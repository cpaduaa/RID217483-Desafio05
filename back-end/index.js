const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let livros = [];

app.get('/livros', (req, res) => {
  res.json(livros);
});

app.get('/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id === req.params.id);
  if (!livro) return res.status(404).json({ mensagem: 'Livro não encontrado' });
  res.json(livro);
});

app.post('/livros', (req, res) => {
  const livrosRecebidos = Array.isArray(req.body) ? req.body : [req.body];
  const livrosAdicionados = [];

  for (const livro of livrosRecebidos) {
    const { titulo, num_paginas, isbn, editora } = livro;

    if (!titulo || !num_paginas || !isbn || !editora) {
      return res.status(400).json({ mensagem: 'Preencha todos os campos' });
    }

    const novoLivro = {
      id: uuidv4(),
      titulo,
      num_paginas,
      isbn,
      editora
    };

    livros.push(novoLivro);
    livrosAdicionados.push(novoLivro);
  }

  res.status(201).json(livrosAdicionados);
});

app.put('/livros/:id', (req, res) => {
  const { titulo, num_paginas, isbn, editora } = req.body;
  const livroIndex = livros.findIndex(l => l.id === req.params.id);

  if (livroIndex === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  livros[livroIndex] = {
    id: req.params.id,
    titulo,
    num_paginas,
    isbn,
    editora
  };

  res.json(livros[livroIndex]);
});

app.delete('/livros/:id', (req, res) => {
  const livroIndex = livros.findIndex(l => l.id === req.params.id);

  if (livroIndex === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  const livroRemovido = livros.splice(livroIndex, 1);
  res.json(livroRemovido[0]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


