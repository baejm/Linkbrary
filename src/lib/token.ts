export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("authToken", token);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("authToken");
  return typeof token === "string" && token.length > 10;
}

export function logoutAll() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
}
