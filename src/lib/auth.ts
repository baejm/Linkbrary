import { fetchApi } from "./api";

export interface signInProps {
  email: string;
  password: string;
}

export interface signUpProps extends signInProps {
  name: string;
}

export async function signup({ email, password, name }: signUpProps) {
  return fetchApi(`/auth/sign-up`, {
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
