// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

async function getLinkToken(token: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

  const res = await fetch(`${base}/${teamId}/auth/sign-in/kakao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    }),
  });

  const data = await res.json();
  return data.accessToken;
}

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API!,
      clientSecret: "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account?.provider === "kakao") {
        const kakaoToken = account.access_token as string;
        const linkToken = await getLinkToken(kakaoToken);
        token.linkToken = linkToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.linkToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
