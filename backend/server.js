const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const products = [
  {
    id: 1,
    name: "Smart Watch",
    image: "/images/smartwatch.jpg",
    price: "$199",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    image: "/images/headphones.jpg",
    price: "$99",
    color: "bg-red-500",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    image: "/images/mouse.jpg",
    price: "$49",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    image: "/images/keyboard.jpg",
    price: "$129",
    color: "bg-yellow-500",
  },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
