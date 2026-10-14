
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e9f5f1",
        padding: "48px 20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#236b60", fontSize: 36 }}>
        🎮 TOBY 時間大作戰
      </h1>

      <p style={{ color: "#547b73", fontSize: 18 }}>
        每日打卡作息表得點數
      </p>

      <section
        style={{
          maxWidth: 500,
          margin: "40px auto",
          padding: 30,
          background: "white",
          borderRadius: 20,
        }}
      >
        <h2>⭐ 歡迎來到時間大作戰</h2>
        <p>TOBY 和 HARPER 的任務基地</p>
        <p>完成每日任務，累積點數，兌換獎勵！</p>
        <p style={{ color: "#238b78" }}>
          網站初始版本建立成功
        </p>
      </section>
    </main>
  );
}
