
"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        shouldCreateUser: false,
      },
    });

    if (error) {
      setMessage("登入失敗：" + error.message);
    } else {
      setMessage("登入連結已寄出，請到 Email 信箱查看！");
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
      fontFamily: "Arial, sans-serif",
    }}>
      <section style={{
        background: "white",
        padding: 36,
        borderRadius: 24,
        maxWidth: 420,
        width: "100%",
        textAlign: "center",
      }}>
        <h1 style={{ color: "#236b60" }}>
          🎮 TOBY 時間大作戰
        </h1>

        <h2>🔐 家長登入</h2>

        <p>輸入已在 Supabase 建立的家長 Email</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="家長 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 14,
              border: "1px solid #ccc",
              borderRadius: 10,
              marginBottom: 16,
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 14,
              background: "#236b60",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            {loading ? "寄送中..." : "寄送登入連結"}
          </button>
        </form>

        <p role="status" style={{ color: "#238b78" }}>
          {message}
        </p>
      </section>
    </main>
  );
}
