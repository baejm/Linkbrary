// lib/api.ts
import { getToken, logoutAll } from "./token";

export async function fetchApi(path: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  const token = getToken();

  const res = await fetch(`${base}/${teamId}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body,
  });

  const txt = await res.text();
  let json: any = {};
  try {
    json = txt ? JSON.parse(txt) : {};
  } catch {}

  if (res.status === 401) {
    logoutAll();
    throw { status: 401 };
  }
  if (!res.ok) throw { status: res.status, body: json };

  return json;
}
