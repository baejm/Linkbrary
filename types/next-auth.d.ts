import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    token?: {
      access_token?: string | null;
    };
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id?: string;
  }

  interface Account {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    token_type?: string;
    id_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    linkToken?: string;
    accessToken?: string;
  }
}
