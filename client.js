const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

// Task 10: Get all books (Async/Await)
async function getAllBooks() {
  try {
    const res = await axios.get(`${BASE_URL}/books`);
    console.log("All Books:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// Task 11: Search by ISBN (Promise)
function searchByISBN(isbn) {
  axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(res => console.log("Book by ISBN:", res.data))
    .catch(err => console.error(err.message));
}

// Task 12: Search by Author (Async/Await)
async function searchByAuthor(author) {
  try {
    const res = await axios.get(`${BASE_URL}/books/author/${author}`);
    console.log("Books by Author:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// Task 13: Search by Title (Async/Await)
async function searchByTitle(title) {
  try {
    const res = await axios.get(`${BASE_URL}/books/title/${title}`);
    console.log("Books by Title:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// Run functions
getAllBooks();
searchByISBN("1234");
searchByAuthor("John Doe");
searchByTitle("Node.js Guide");
