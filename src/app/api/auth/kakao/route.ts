import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "인가코드 없음" }, { status: 400 });
  }

  const redirectUri = "http://localhost:3000/api/auth/kakao";
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
  const REST_API_KEY = process.env.KAKAO_REST_API!; // ⭐ 서버용 키 사용

  // 1) 카카오 토큰 교환
  const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: REST_API_KEY, // ⭐ undefined 문제 해결됨
      redirect_uri: redirectUri,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    console.log("카카오 응답:", tokenData);
    return NextResponse.json(
      { error: "카카오 토큰 발급 실패" },
      { status: 500 }
    );
  }

  // 2) Linkbrary 서버 로그인
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${teamId}/auth/sign-in/kakao`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: tokenData.access_token,
        redirectUri,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.accessToken) {
    console.log("백엔드 응답:", data);
    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  }

  return NextResponse.redirect(
    `http://localhost:3000/oauth/callback?access=${data.accessToken}`
  );
}
