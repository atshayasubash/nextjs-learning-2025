import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ProductDetail.module.css"; // Update path as needed

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/products/${id}`)
                .then((res) => res.json())
                .then((data) => setProduct(data));
        }
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.detailWrapper}>
            <div className={styles.detailCard}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> {product.price}</p>
                <button onClick={() => router.back()} className={styles.backBtn}>
                    Go Back
                </button>
            </div>
        </div>
    );
}
