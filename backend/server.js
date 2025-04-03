const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
const DATA_FILE = "products.json";
const cors = require("cors");
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


// GET: Fetch all products
app.get("/api/products", (req, res) => {
  res.json(readData());
});
app.post("/api/products", (req, res) => {
  const products = readData();
  const { name, price, category, image } = req.body;

  if (!category || !name || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // if (products.find(p => p.id === id)) {
  //     return res.status(400).json({ message: "Product number must be unique" });
  // }

  const newProduct = { id: products.length + 1, name, price, category, image };



  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

// POST: Add new product
app.post("/api/products", (req, res) => {
  const products = readData();
  const { id, productName, price, image } = req.body;

  if (!id || !productName || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (products.find(p => p.id === id)) {
    return res.status(400).json({ message: "Product number must be unique" });
  }

  const newProduct = { id, productName, price, image };

  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

// PUT: Edit product
// ✅ PUT: Update a Product by ID
app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, image } = req.body; // Get updated data

  // ✅ Find product by ID
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: `Product with ID ${productId} not found` });
  }

  // ✅ Update product properties
  if (name) product.name = name;
  if (price) product.price = price;
  if (image) product.image = image;

  res.json({ message: "Product updated successfully", product });
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
