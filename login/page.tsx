
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("登入失敗：" + error.message);
    } else {
      router.push("/");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#e9f5f1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <form onSubmit={handleLogin} style={{
        background: "white",
        padding: 36,
        borderRadius: 28,
        maxWidth: 440,
        width: "100%",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#236b60" }}>
          🎮 TOBY 時間大作戰
        </h1>
        <h2>🔐 家長登入</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 16,
            border: 0,
            borderRadius: 12,
            background: "#236b60",
            color: "white",
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          {loading ? "登入中..." : "登入"}
        </button>

        {message && (
          <p role="alert" style={{ color: "#b42318" }}>
            {message}
          </p>
        )}
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 14,
  marginBottom: 16,
  border: "1px solid #ccd6d3",
  borderRadius: 12,
  fontSize: 16
};
