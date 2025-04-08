import { useState } from "react";
import styles from "../../styles/Modal.module.css";

export default function ProductModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        category: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        onClose();
        window.location.reload();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <input placeholder="Image URL" onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
                    <input placeholder="Price" onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                    <input placeholder="Category" onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                    <div className={styles.btns}>
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
