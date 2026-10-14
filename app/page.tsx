
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
      setLoading(false);
    });

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setEmail(session?.user?.email ?? "");
      });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("登出失敗：" + error.message);
      return;
    }
    router.push("/login");
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#e9f5f1",
      padding: "48px 20px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#236b60", fontSize: 36 }}>
        🎮 TOBY 時間大作戰
      </h1>

      <p style={{ color: "#547b73", fontSize: 18 }}>
        每日打卡作息表得點數
      </p>

      <section style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 30,
        background: "white",
        borderRadius: 20
      }}>
        <h2>⭐ 歡迎來到時間大作戰</h2>
        <p>TOBY 和 HARPER 的任務基地</p>

        {loading ? (
          <p>確認登入狀態中...</p>
        ) : email ? (
          <>
            <p style={{ color: "#238b78" }}>
              ✅ 家長登入成功
            </p>
            <p>{email}</p>
            <button onClick={logout} style={buttonStyle}>
              登出
            </button>
          </>
        ) : (
          <>
            <p>請先登入家長帳號</p>
            <button
              onClick={() => router.push("/login")}
              style={buttonStyle}
            >
              前往登入
            </button>
          </>
        )}
      </section>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  background: "#236b60",
  color: "white",
  padding: "14px 30px",
  border: 0,
  borderRadius: 12,
  fontSize: 16,
  cursor: "pointer"
};
