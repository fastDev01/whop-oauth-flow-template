# 🪪 Whop OAuth Integration (Next.js Pages Router)

This example shows how to implement **Login with Whop** using the Whop OAuth API in a **Next.js (Pages Router)** app.

---

## ⚙️ Setup

### 1. Configure your redirect URL inside Whop
In your Whop developer dashboard, go to your **App Settings → OAuth → Redirect URIs** and add:  

http://localhost:3000/api/oauth/callback


This must exactly match the redirect URI used in your API route.

---

### 2. Add required environment variables

Create a `.env.local` file in your project root and define:

WHOP_API_KEY=
NEXT_PUBLIC_WHOP_APP_ID=
NEXT_PUBLIC_WHOP_AGENT_USER_ID=
NEXT_PUBLIC_WHOP_COMPANY_ID=


These values come from your Whop Developer Dashboard.  
⚠️ **Do not commit them** to version control.

---

## 🔁 OAuth Flow Overview

1. **User clicks “Login with Whop”**  
   - The link points to `/api/oauth/init?next=/home`.
   - This route creates an authorization URL using Whop’s SDK and redirects the user to Whop’s consent page.

2. **User authorizes your app on Whop**  
   - Whop redirects back to your callback endpoint:  
     `/api/oauth/callback?code=...&state=...`

3. **Callback exchanges code for access token**  
   - Your `/api/oauth/callback` route verifies the state cookie.  
   - Then it calls `whopApi.oauth.exchangeCode()` to get an access token.  
   - The token is stored in a secure `HttpOnly` cookie named `whop_access_token`.

4. **User is redirected to `/home`**  
   - `/home` checks if the `whop_access_token` cookie exists.  
   - If present → shows success message and token.  
   - If missing → shows an error prompt.

---

## 📁 File Structure

pages/
│
├── api/
│ └── oauth/
│ ├── init.js # Starts OAuth login and sets state cookie
│ └── callback.js # Handles OAuth callback and stores token
│
├── login.js # Simple page with “Login with Whop” button
└── home.js # Displays success or error based on cookie


---

## ▶️ Usage

1. Start your app:
   ```bash
   npm run dev

2. Visit:
    http://localhost:3000/login

3. Click “Login with Whop”.

4. Complete the OAuth flow on Whop.

5. You’ll be redirected to /home, which will confirm success or show an error.
    
✅ Notes

- The token cookie (whop_access_token) is for demonstration only.
In production, store it securely (e.g., encrypted session, backend DB).

- The example uses plain JavaScript and the Next.js Pages Router — no TypeScript or App Router.

- Always keep your WHOP_API_KEY private and never expose it to the client.