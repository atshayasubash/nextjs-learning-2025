// Base URL for API calls (environment variable for flexibility)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Utility function for making API calls with error handling
async function apiFetch(url, options = {}) {
    try {
        const res = await fetch(url, options);

        // Check if the response status is not OK
        if (!res.ok) {
            const errorDetails = await res.json().catch(() => null); // Attempt to parse error response
            throw new Error(
                `API Error: ${res.status} ${errorDetails?.message || res.statusText}`
            );
        }

        // Return JSON response if successful
        return res.json();
    } catch (error) {
        console.error(`Error occurred while fetching ${url}:`, error.message);
        throw error;
    }
}

// Fetch all products
export async function getProducts() {
    return apiFetch(`${API_BASE_URL}/api/products`);
}

// Fetch a single product by ID
export async function getProductById(id) {
    return apiFetch(`${API_BASE_URL}/api/products/${id}`);
}

// Add a new product
export async function addProduct(product) {
    return apiFetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
}

// Edit an existing product
export async function editProduct(id, updatedData) {
    return apiFetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
}

// Delete a product by ID
export async function deleteProduct(id) {
    return apiFetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
    });
}