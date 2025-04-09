import { useState, useEffect } from "react";
import ProductModal from "../components/ProductModal";
import EditModal from "../components/EditModal";
import styles from "../../styles/ProductDetail.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { getProducts, deleteProduct } from "../../utils/api";
export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        // fetch("http://localhost:5000/api/products")
        //     .then((res) => res.json())
        //     .then((data) => setProducts(data));
        getProducts().then((data) => setProducts(data));
    }, []);

    // const handleDelete = async (id) => {
    //     if (confirm("Are you sure you want to delete this product?")) {
    //         const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    //             method: "DELETE",
    //         });
    //         if (res.ok) {
    //             setProducts(products.filter((p) => p.id !== id));
    //         }
    //     }
    // };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id)
            setProducts(products.filter((p) => p.id !== id));
        };
    };

    const { data: session } = useSession();
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1><img src="/icons/loaded-trolly.svg" className={styles.icon} />Product Showcase</h1>
                {session ? (
                    <button
                        onClick={() =>
                            signOut({ callbackUrl: "/login" })
                        }
                        className={styles.logoutBtn}
                    >
                        Logout
                    </button>
                ) : (
                    <button onClick={() => signIn()} className={styles.loginBtn}>
                        Login
                    </button>
                )}
                <button onClick={() => setShowAddModal(true)} className={styles.addBtn}><img src="/icons/add.svg" alt="Add" width={18} height={18} />&nbsp;Add Product</button>
            </div>

            <div className={styles.grid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.category}</p>
                        <strong>{product.price}</strong>
                        <div className={styles.actions}>
                            <button data-testid="edit-button" onClick={() => setEditProduct(product)}><img src="/icons/edit.svg" className={styles.icon} />Edit</button>
                            <button onClick={() => handleDelete(product.id)}><img src="/icons/delete.svg" className={styles.icon} />Delete</button>
                            <Link href={`/products/${product.id}`}>
                                <button className={styles.viewBtn}><img src="/icons/view.svg" className={styles.icon} />View</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {showAddModal && <ProductModal onClose={() => setShowAddModal(false)} />}
            {editProduct && <EditModal product={editProduct} onClose={() => setEditProduct(null)} />}
        </div>
    );
}
