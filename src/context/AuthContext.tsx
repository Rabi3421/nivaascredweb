"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  AuthUser,
  AuthProfile,
  LoginInput,
  RegisterInput,
  getDashboardRoute,
} from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: AuthUser | null;
  profile: AuthProfile;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<AuthProfile>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadUser = useCallback(async () => {
    try {
      const res = await authService.getMe();
      setUser(res.data!.user);
      setProfile(res.data!.profile);
    } catch (err) {
      // If 401, try refresh → retry getMe once
      if (err instanceof ApiClientError && err.status === 401) {
        try {
          await authService.refreshToken();
          const res = await authService.getMe();
          setUser(res.data!.user);
          setProfile(res.data!.profile);
        } catch {
          setUser(null);
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (input: LoginInput) => {
    const res = await authService.login(input);
    setUser(res.data!.user);
    setProfile(null);
    router.push(getDashboardRoute(res.data!.user.role));
  }, [router]);

  const register = useCallback(async (input: RegisterInput) => {
    const res = await authService.register(input);
    setUser(res.data!.user);
    setProfile(null);
    router.push(`/onboarding/${res.data!.user.role}`);
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Always clear state even if logout API fails
    }
    setUser(null);
    setProfile(null);
    router.push("/auth/login");
  }, [router]);

  const refreshUser = useCallback(async () => {
    await loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
