import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'd3p_sp4c3_n4vy_4cc3ss_s3cr3t_77889900aabbcc';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'n3bul4_purpl3_r3fr3sh_s3cr3t_112233445566ee';

export interface TokenPayload {
  userId: string;
  role: 'user' | 'admin';
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(payload: { userId: string }): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function setAuthCookies(userId: string, role: 'user' | 'admin') {
  const accessToken = generateAccessToken({ userId, role });
  const refreshToken = generateRefreshToken({ userId });
  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60, // 15 minutes
    path: '/',
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  return { accessToken, refreshToken };
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}

export async function getAuthUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}
