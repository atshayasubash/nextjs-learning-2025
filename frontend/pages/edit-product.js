import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        category: "",
    });

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/products/${id}`)
                .then((res) => res.json())
                .then((data) => setFormData(data));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push("/");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    ✏️ Edit Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-gray-700 font-medium">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter category"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
                    >
                        ✅ Update Product
                    </button>
                </form>
                <button
                    onClick={() => router.push("/")}
                    className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                    🔙 Cancel
                </button>
            </div>
        </div>
    );
};

export default EditProduct;
