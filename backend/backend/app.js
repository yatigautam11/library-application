import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/books", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/books.json");

  const booksData = JSON.parse(fileContent);

  res.status(200).json({ books: booksData });
});

app.get("/user-books", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-books.json");

  const books = JSON.parse(fileContent);

  res.status(200).json({ books });
});

app.put("/user-books", async (req, res) => {
  const placeId = req.body.placeId;

  const fileContent = await fs.readFile("./data/books.json");
  const booksData = JSON.parse(fileContent);

  const place = booksData.find((place) => place.id === placeId);

  const userbooksFileContent = await fs.readFile("./data/user-books.json");
  const userbooksData = JSON.parse(userbooksFileContent);

  let updatedUserbooks = userbooksData;

  if (!userbooksData.some((p) => p.id === place.id)) {
    updatedUserbooks = [...userbooksData, place];
  }

  await fs.writeFile(
    "./data/user-books.json",
    JSON.stringify(updatedUserbooks)
  );

  res.status(200).json({ userbooks: updatedUserbooks });
});

app.delete("/user-books/:id", async (req, res) => {
  const placeId = req.params.id;

  const userbooksFileContent = await fs.readFile("./data/user-books.json");
  const userbooksData = JSON.parse(userbooksFileContent);

  const placeIndex = userbooksData.findIndex((place) => place.id === placeId);

  let updatedUserbooks = userbooksData;

  if (placeIndex >= 0) {
    updatedUserbooks.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-books.json",
    JSON.stringify(updatedUserbooks)
  );

  res.status(200).json({ userbooks: updatedUserbooks });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
