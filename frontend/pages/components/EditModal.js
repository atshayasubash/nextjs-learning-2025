import { useState } from "react";
import styles from '../../styles/Modal.module.css';


export default function EditModal({ product, onClose }) {
    const [formData, setFormData] = useState(product);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/api/products/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        onClose();
        window.location.reload();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                    <input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    <input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                    <div className={styles.btns}>
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
