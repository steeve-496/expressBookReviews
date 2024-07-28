const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
    try {
        const bookList = Object.values(books);
        res.json(bookList);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = books[isbn];
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book by ISBN" });
    }
});

// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
    const { author } = req.params;
    try {
        const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
        if (booksByAuthor.length > 0) {
            res.json(booksByAuthor);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by author" });
    }
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
        if (booksByTitle.length > 0) {
            res.json(booksByTitle);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by title" });
    }
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = books[isbn];
        if (book) {
            res.json(book.reviews);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book reviews" });
    }
});

module.exports.general = public_users;
