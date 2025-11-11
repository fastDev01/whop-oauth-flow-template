// pages/api/oauth/login.js

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

  const next = typeof req.query.next === "string" ? req.query.next : "/home";

  const { url: authUrl, state } = whopApi.oauth.getAuthorizationUrl({
    redirectUri: "http://localhost:3000/api/oauth/callback",
    scope: ["read_user"],
  });

  const cookie = [
    `oauth-state.${state}=${encodeURIComponent(next)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=3600",
  ].join("; ");

  res.setHeader("Set-Cookie", cookie);
  res.redirect(authUrl);
}
