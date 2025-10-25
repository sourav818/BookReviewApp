const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let books = {
  "1234": { title: "Node.js Guide", author: "John Doe", reviews: {} },
  "5678": { title: "Learning Express", author: "Jane Smith", reviews: {} }
};

let users = {};

// Task 1: Get all books
app.get('/books', (req, res) => res.json(books));

// Task 2: Get books by ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// Task 3: Get books by Author
app.get('/books/author/:author', (req, res) => {
  const result = Object.values(books).filter(b => b.author === req.params.author);
  res.json(result);
});

// Task 4: Get books by Title
app.get('/books/title/:title', (req, res) => {
  const result = Object.values(books).filter(b => b.title === req.params.title);
  res.json(result);
});

// Task 5: Get book reviews
app.get('/books/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  book ? res.json(book.reviews) : res.status(404).json({ message: "Book not found" });
});

// Task 6: Register
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(400).json({ message: "User exists" });
  users[username] = { password };
  res.json({ message: "User registered successfully" });
});

// Task 7: Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username].password === password)
    res.json({ message: "Login successful" });
  else res.status(401).json({ message: "Invalid credentials" });
});

// Task 8: Add/Modify Review
app.post('/auth/review/:isbn', (req, res) => {
  const { username, review } = req.body;
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  book.reviews[username] = review;
  res.json({ message: "Review added/updated" });
});

// Task 9: Delete Review
app.delete('/auth/review/:isbn/:username', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  delete book.reviews[req.params.username];
  res.json({ message: "Review deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
