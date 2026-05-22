import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface JwtTokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface DecodedToken extends JwtTokenPayload {
  iat: number;
  exp: number;
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

export function signAccessToken(payload: JwtTokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function signRefreshToken(payload: JwtTokenPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): DecodedToken {
  return jwt.verify(token, ACCESS_SECRET) as DecodedToken;
}

export function verifyRefreshToken(token: string): DecodedToken {
  return jwt.verify(token, REFRESH_SECRET) as DecodedToken;
}

// SHA-256 for refresh tokens — bcrypt has a 72-char limit, JWTs exceed it
export function hashRefreshToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function compareRefreshToken(
  plainToken: string,
  storedHash: string
): boolean {
  const plainHash = hashRefreshToken(plainToken);
  const a = Buffer.from(plainHash, "hex");
  const b = Buffer.from(storedHash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
