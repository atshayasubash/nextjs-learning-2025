import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🛍️ Product Showcase</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            🚪 Logout
          </button>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.push("/add-product")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
          >
            ➕ Add Product
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">
                    {product.price}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => router.push(`/edit-product?id=${product.id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition duration-300"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-full">
              No products found. Add some!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
