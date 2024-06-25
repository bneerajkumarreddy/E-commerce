// server.js

const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// Initialize SQLite database connection
const db = new sqlite3.Database("./database.db");

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy user data (for demo purposes)
let users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    email: "user1@example.com",
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    email: "user2@example.com",
  },
];

// Dummy product data
let products = [
  { id: 1, name: "Product 1", price: 10.99, category: "Electronics" },
  { id: 2, name: "Product 2", price: 29.99, category: "Clothing" },
];

// Routes for handling user authentication

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Routes for handling product management

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add a new product
app.post("/api/products", (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = { id: products.length + 1, name, price, category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
