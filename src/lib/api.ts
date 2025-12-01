import { getToken, logoutAll } from "./token";

export async function fetchApi(path: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

  const url = `${base}/${teamId}${path}`;
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    console.warn("🔒 JWT expired → 자동 로그아웃");
    logoutAll();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Token expired");
  }

  const text = await res.text();

  let json = null;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {}

  if (!res.ok) throw { status: res.status, body: json };

  return json;
}
