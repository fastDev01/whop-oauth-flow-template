// pages/api/oauth/callback.js

import { WhopServerSdk } from "@whop/api";

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { code, state } = req.query;

  if (!code) {
    return res.redirect("/oauth/error?error=missing_code");
  }

  if (!state) {
    return res.redirect("/oauth/error?error=missing_state");
  }

  const cookieHeader = req.headers.cookie || "";
  const stateCookie = cookieHeader
    .split(";")
    .find((cookie) => cookie.trim().startsWith(`oauth-state.${state}=`));

  if (!stateCookie) {
    return res.redirect("/oauth/error?error=invalid_state");
  }

  try {
    const authResponse = await whopApi.oauth.exchangeCode({
      code,
      redirectUri: "http://localhost:3000/api/oauth/callback",
    });

    if (!authResponse.ok) {
      return res.redirect("/oauth/error?error=code_exchange_failed");
    }

    const { access_token } = authResponse.tokens;

    const next = decodeURIComponent(stateCookie.split("=")[1]);
    const nextUrl = new URL(next, "http://localhost:3000");

    res.setHeader(
      "Set-Cookie",
      [
        `whop_access_token=${access_token}`,
        "Path=/",
        "HttpOnly",
        "Secure",
        "SameSite=Lax",
        "Max-Age=3600",
      ].join("; ")
    );

    return res.redirect(nextUrl.toString());
  } catch (err) {
    console.error("OAuth callback error:", err);
    return res.redirect("/oauth/error?error=server_error");
  }
}
