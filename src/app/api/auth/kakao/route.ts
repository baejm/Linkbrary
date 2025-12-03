import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  console.log("== route.ts 시작 ==");
  console.log("받은 인가코드:", code);

  if (!code) {
    return NextResponse.json({ error: "인가코드 없음" }, { status: 400 });
  }

  const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

  console.log("사용 redirectUri:", redirectUri);
  console.log("teamId:", teamId);

  // 1) 로그인 시도
  console.log("---- sign-in 요청 ----");
  const signInRes = await fetch(`${API}/${teamId}/auth/sign-in/kakao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: code,
      redirectUri,
    }),
  });

  console.log("sign-in status:", signInRes.status);
  const signInData = await signInRes.json();
  console.log("sign-in 응답:", signInData);

  // server 응답이 access_token옴
  const accessToken = signInData.accessToken ?? signInData.access_token ?? null;

  if (signInRes.ok && accessToken) {
    console.log("로그인 성공 → callback 리다이렉트");
    return NextResponse.redirect(
      `http://localhost:3000/oauth/callback?access=${accessToken}`
    );
  }

  // 2) 회원가입 시도
  console.log("로그인 실패 → 회원가입 시도");
  console.log("---- sign-up 요청 ----");

  const signUpRes = await fetch(`${API}/${teamId}/auth/sign-up/kakao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: code,
      redirectUri,
    }),
  });

  console.log("sign-up status:", signUpRes.status);
  const signUpData = await signUpRes.json();
  console.log("sign-up 응답:", signUpData);

  const signUpAccessToken =
    signUpData.accessToken ?? signUpData.access_token ?? null;

  if (!signUpRes.ok || !signUpAccessToken) {
    console.log("회원가입 실패!");
    return NextResponse.json(
      { error: "카카오 회원가입 실패" },
      { status: 500 }
    );
  }

  console.log("회원가입 성공 → callback 리다이렉트");

  return NextResponse.redirect(
    `http://localhost:3000/oauth/callback?access=${signUpAccessToken}`
  );
}
