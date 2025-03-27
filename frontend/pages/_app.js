import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"; // Ensure your styles are imported

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
