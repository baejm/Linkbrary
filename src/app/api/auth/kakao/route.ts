import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

  // 1) 로그인 시도
  const signInRes = await fetch(`${API}/${teamId}/auth/sign-in/kakao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: code, redirectUri }),
  });

  const signIn = await signInRes.json();
  const accessToken = signIn.accessToken ?? signIn.access_token ?? null;

  if (signInRes.ok && accessToken) {
    return NextResponse.redirect(
      new URL(`/auth-redirect?access=${accessToken}`, request.url)
    );
  }

  // 2) 회원가입 시도
  const signUpRes = await fetch(`${API}/${teamId}/auth/sign-up/kakao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: code, redirectUri }),
  });

  const signUp = await signUpRes.json();
  const accessToken2 = signUp.accessToken ?? signUp.access_token ?? null;

  if (!signUpRes.ok || !accessToken2) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.redirect(
    new URL(`/auth-redirect?access=${accessToken2}`, request.url)
  );
}
