
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email.trim()) {
      setMessage("請先輸入電子郵件");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.origin + "/",
      },
    });

    setLoading(false);

    if (error) {
      setMessage("登入失敗：" + error.message);
    } else {
      setMessage("登入連結已寄出，請查看電子郵件。");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e9f5f1",
        display: "grid",
        placeItems: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 30,
          borderRadius: 20,
          background: "white",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ color: "#236b60" }}>
          🎮 TOBY 時間大作戰
        </h1>

        <h2>家長登入</h2>

        <p>請輸入家長的電子郵件</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="電子郵件"
          style={{
            width: "100%",
            padding: 12,
            boxSizing: "border-box",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={login}
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            marginTop: 16,
            border: 0,
            borderRadius: 10,
            background: "#236b60",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "寄送中..." : "寄送登入連結"}
        </button>

        <p role="status">{message}</p>
      </section>
    </main>
  );
}
