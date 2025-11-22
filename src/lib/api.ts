export async function fetchApi(path: string, options: RequestInit = {}) {
  const url = `
  ${process.env.NEXT_PUBLIC_API_BASE_URL}/
  ${process.env.NEXT_PUBLIC_TEAM_ID}/
  ${path}  
  `;

  const response = await fetch(url, {
    headers: {
      "Content-type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API 에러났어요");
  }
  return response.json();
}
