//@ts-ignore
import { Context } from "https://deno.land/x/oak/mod.ts"
//@ts-ignore
import { verify } from "https://deno.land/x/djwt/mod.ts"

const secretKey = "your-secret-key";
const secretKeyBuffer = new TextEncoder().encode(secretKey);
const cryptoKey = await crypto.subtle.importKey(
  "raw",
  secretKeyBuffer,
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"]
); // Use a secure key in real apps

export const authMiddleware = async (context: Context, next: Function) => {
  const authHeader = context.request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    context.response.status = 401;
    context.response.body = { message: "Unauthorized: No token provided" };
    return;
  }

  const jwt = authHeader.split(" ")[1]; // Extract the JWT token

  try {
    const payload = await verify(jwt, cryptoKey);
    context.state.user = payload; // Save the payload to context.state
    await next(); // Continue to next middleware or route handler
  } catch (error) {
    context.response.status = 401;
    context.response.body = { message: "Unauthorized: Invalid token" };
  }
};
