// pages/oauth/success.js

export async function getServerSideProps({ req }) {
  const cookieHeader = req.headers.cookie || "";
  const tokenCookie = cookieHeader
    .split(";")
    .find((cookie) => cookie.trim().startsWith("whop_access_token="));

  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  return {
    props: {
      token: token || null,
    },
  };
}

export default function OAuthSuccess({ token }) {
  const hasToken = Boolean(token);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111",
        color: "#fff",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {hasToken ? (
        <>
          <h1>✅ Authentication Successful</h1>
          <p>Welcome! You’ve successfully logged in with Whop.</p>
          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              background: "#222",
              padding: "10px 20px",
              borderRadius: "6px",
              wordBreak: "break-all",
            }}
          >
            Access Token: {token}
          </p>
        </>
      ) : (
        <>
          <h1>❌ Authentication Failed</h1>
          <p>No valid <code>whop_access_token</code> cookie found.</p>
          <a
            href="/login"
            style={{
              marginTop: "20px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "10px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Try Again
          </a>
        </>
      )}
    </div>
  );
}
