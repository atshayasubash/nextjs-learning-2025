import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home({ products, session }) {
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">You must be logged in to view products</h1>
        <button onClick={() => router.push("/login")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="container-header"><h1 className="text-3xl font-bold mb-4">Product List</h1>
        <button onClick={() => signOut()} className="container-header-button bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
          Logout
        </button></div>

      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} width={300} height={200} className="product-image" />
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">{product.price}</p>
              <p className="product-description">{product.desc}</p>
              <button className="product-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Fetch products from Node.js backend
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();

  return { props: { products, session } };
}
