const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
const DATA_FILE = "products.json";
const cors = require("cors");
const { log } = require("console");
app.use(cors());
app.use(express.json());

// Helper function to read JSON file
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

// Helper function to write JSON file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};
//Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const users = [
    { id: 1, username: "admin", password: "adminTest123", name: "Admin" },
    { id: 2, username: "user", password: "userTest123", name: "User" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return res.json({ id: user.id, name: user.name, email: `${user.username}@app.com` });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

// GET: Fetch all products
app.get("/api/products", (req, res) => {
  res.json(readData());
});

app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const products = readData();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// POST: Add new product
app.post("/api/products", (req, res) => {
  const products = readData();
  let { category, name, price, image } = req.body;

  if (!category || !name || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!image.startsWith("/images/")) {
    image = `/images/${image}`;
  }
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

  const newProduct = { id: newId, category, name, price, image };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct)
});
// PUT: Update a Product by ID
app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, image, category } = req.body;

  let products = readData();
  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return res.status(404).json({ message: `Product with ID ${productId} not found` });
  }

  // Update product
  products[index] = {
    ...products[index],
    name: name ?? products[index].name,
    price: price ?? products[index].price,
    image: image ?? products[index].image,
    category: category ?? products[index].category,
  };

  writeData(products);
  res.json({ message: "Product updated successfully", product: products[index] });
});


// DELETE: Remove product
app.delete("/api/products/:id", (req, res) => {
  let products = readData();
  const { id } = req.params;

  const filteredProducts = products.filter(p => p.id != id);
  if (filteredProducts.length === products.length) {
    return res.status(404).json({ message: "Product not found" });
  }

  writeData(filteredProducts);
  res.json({ message: "Product deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
