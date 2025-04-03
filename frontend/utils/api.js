export const API_BASE_URL = "http://localhost:5000";

export async function getProducts() {
    const res = await fetch("http://localhost:5000/api/products");
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}


export async function getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
    return res.json();
}

export async function addProduct(product) {
    const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    return res.json();
}
export async function editProduct(id, updatedData) {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error(`Error updating product: ${res.status}`);
    return res.json();
}


export async function deleteProduct(id) {
    await fetch(`${API_BASE_URL}/api/products/${id}`, { method: "DELETE" });
}
