import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Login to Product Showcase</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
