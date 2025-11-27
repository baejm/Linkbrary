import { fetchApi } from "./api";

export interface signInProps {
  email: string;
  password: string;
}

export interface KakaoSignupRequest {
  name: string;
  token: string;
  redirectUri: string;
}

export interface KakaoSigninRequest {
  token: string;
  redirectUri: string;
}

export interface signUpProps extends signInProps {
  name: string;
}

export async function signup({ email, password, name }: signUpProps) {
  return fetchApi(`auth/sign-up`, {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function signin({ email, password }: signInProps) {
  return fetchApi(`/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signupWithKakao({
  token,
  redirectUri,
  name,
}: {
  token: string;
  redirectUri: string;
  name: string;
}) {
  return await fetchApi(`/auth/sign-up/kakao`, {
    method: "POST",
    body: JSON.stringify({
      name,
      token, // 🔥 필드명 반드시 token
      redirectUri,
    }),
  });
}

export async function signinWithKakao({
  token,
  redirectUri,
}: {
  token: string;
  redirectUri: string;
}) {
  return await fetchApi(`/auth/sign-in/kakao`, {
    method: "POST",
    body: JSON.stringify({
      token, // 🔥 필드명 반드시 token
      redirectUri,
    }),
  });
}

export async function getKakaoAccessToken(code: string) {
  const url = `
    https://kauth.kakao.com/oauth/token
    ?grant_type=authorization_code
    &client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}
    &redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}
    &code=${code}
  `.replace(/\s/g, "");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return res.json();
}
