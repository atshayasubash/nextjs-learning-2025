import { getSession } from "next-auth/react";
import ProductList from "../pages/components/ProductList"; // your component path

export default function ProductsPage({ session }) {
  return <ProductList />;
}

// 🔒 Auth check on server-side
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

  return { props: { session } };
}
