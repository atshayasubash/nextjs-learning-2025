import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "123456" },
      },
      async authorize(credentials) {
        // Simple Hardcoded Authentication (Replace with DB check)
        if (credentials.username === "admin" && credentials.password === "123456") {
          return { id: 1, name: "Admin", email: "admin@example.com" };
        }
        // Return null if authentication fails
        throw new Error("Invalid username or password");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Custom login page
  },
});
