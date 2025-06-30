import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';


import authController from './controllers/auth.controller.js';
import verifyToken, { requireAdmin } from "./middleware/auth.middleware.js";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

//with installing the cors
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.post('/signup', authController.signup);
app.post('/login', authController.login);
//Apply verifyToken to ALL routes after signup and login
app.use(verifyToken);

// // CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.get("/books", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const fileContent = await fs.readFile("./data/books.json");
    const booksData = JSON.parse(fileContent);
    res.status(200).json({ books: booksData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user-books", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/user-books.json");
    const books = JSON.parse(fileContent);
    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.put("/user-books", async (req, res) => {
  const placeId = req.body.placeId;
  try {
    const fileContent = await fs.readFile("./data/books.json");
    const booksData = JSON.parse(fileContent);
    const place = booksData.find((place) => place.id === placeId);

    if (!place) {
      return res.status(404).json({ error: "Book not found" });
    }

    const userbooksFileContent = await fs.readFile("./data/user-books.json");
    const userbooksData = JSON.parse(userbooksFileContent);

    let updatedUserbooks = [...userbooksData];

    if (!userbooksData.some((p) => p.id === place.id)) {
      updatedUserbooks.push(place);
    }

    await fs.writeFile("./data/user-books.json", JSON.stringify(updatedUserbooks));
    res.status(200).json({ userbooks: updatedUserbooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// TRy catch
app.post("/books", async (req, res) => {
  try {
    const newBook = req.body;

    const fileContent = await fs.readFile("./data/books.json");
    const books = Array.from(JSON.parse(fileContent));

    // Check for duplicate product ID
    const duplicate = books.find(p => p.id === newBook.id);
    if (duplicate) {
      return res.status(409).json({ error: "Book with this ID already exists." });
    }

    books.push(newBook);

    await fs.writeFile("./data/books.json", JSON.stringify(books, null, 2));

    res.status(201).json({ message: "Book added", product: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.delete("/user-books/:id", async (req, res) => {
  const placeId = req.params.id;
  try {
    const userbooksFileContent = await fs.readFile("./data/user-books.json");
    const userbooksData = JSON.parse(userbooksFileContent);
    const placeIndex = userbooksData.findIndex((place) => String(place.id) === String(placeId));

    if (placeIndex === -1) {
      return res.status(404).json({ error: "Book not found in user books" });
    }

    userbooksData.splice(placeIndex, 1);
    await fs.writeFile("./data/user-books.json", JSON.stringify(userbooksData));

    res.status(200).json({ userbooks: userbooksData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/admin/books', verifyToken, requireAdmin, async (req, res) => {
  // Example admin logic: return all books
  try {
    const fileContent = await fs.readFile("./data/books.json");
    const booksData = JSON.parse(fileContent);
    res.status(200).json({ books: booksData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    const fileContent = await fs.readFile("./data/books.json");
    const books = JSON.parse(fileContent);

    const index = books.findIndex((b) => String(b.id) === String(bookId));
    if (index === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    books[index] = { ...books[index], ...updatedBook };

    await fs.writeFile("./data/books.json", JSON.stringify(books, null, 2));
    res.status(200).json(books[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const fileContent = await fs.readFile("./data/books.json");
    const books = JSON.parse(fileContent);

    const index = books.findIndex((b) => String(b.id) === String(bookId));
    if (index === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    books.splice(index, 1);
    await fs.writeFile("./data/books.json", JSON.stringify(books, null, 2));
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});



app.listen(3000);
