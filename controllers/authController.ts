import { Context } from "https://deno.land/x/oak/mod.ts"
import { create, getNumericDate } from "https://deno.land/x/djwt/mod.ts"

const secretKey = "your-secret-key"
const secretKeyBuffer = new TextEncoder().encode(secretKey);
const cryptoKey = await crypto.subtle.importKey(
  "raw",
  secretKeyBuffer,
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"]
);

export const login = async (context: Context) => {
    const body = await context.request.body.json()
    const { username, password } = body
  
    if (username === "user" && password === "password") {
      const payload = {
        iss: username, // 'iss' means issuer, typically the user's ID or name
        exp: getNumericDate(60 * 60), // Token expiration (1 hour)
      }
  
      const jwt = await create({ alg: "HS256", typ: "JWT" }, payload, cryptoKey)
      context.response.body = { token: jwt }
    } else {
      context.response.status = 401
      context.response.body = { message: "Invalid credentials" }
    }
  }
