// pages/login.js

export default function LoginPage() {
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <a
        href="/api/oauth/init?next=/home"
        style={{
          padding: "12px 24px",
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Login with Whop
      </a>
    </div>
  );
}
