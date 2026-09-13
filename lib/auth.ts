import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me");

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret());

  const store = await cookies();
  store.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export async function getAdminSession() {
  try {
    const store = await cookies();
    const token = store.get("admin_session")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

export async function clearSession() {
  const store = await cookies();
  store.delete("admin_session");
}

export async function requireAdmin(){const s=await getAdminSession(); if(!s){const {redirect}=await import('next/navigation'); redirect('/admin/login')} return s}
