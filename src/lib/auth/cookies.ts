import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function getAccessTokenFromCookies(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function getRefreshTokenFromCookies(): Promise<
  string | undefined
> {
  const jar = await cookies();
  return jar.get(REFRESH_TOKEN_COOKIE)?.value;
}

export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string
): void {
  const base = {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax" as const,
    path: "/",
  };

  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    ...base,
    maxAge: 60 * 15, // 15 minutes
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...base,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", { maxAge: 0, path: "/" });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", { maxAge: 0, path: "/" });
}
