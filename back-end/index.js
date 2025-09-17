const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let books = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

app.post('/books', (req, res) => {
  const { title, pages, isbn, publisher } = req.body;
  const newBook = {
    id: uuidv4(),
    title,
    pages,
    isbn,
    publisher
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const { title, pages, isbn, publisher } = req.body;
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  books[bookIndex] = { id: req.params.id, title, pages, isbn, publisher };
  res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
