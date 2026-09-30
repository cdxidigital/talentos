import React, { createContext, useContext, useEffect, useState } from "react";
import type { BusinessIdentity, TaxProfile } from "../types";

export type ThemeMode = "dark" | "light" | "system";

export interface NotificationPreferences {
  emailAlerts: boolean;
  gstThresholdWarning: boolean;
  basFilingReminders: boolean;
  superannuationDueAlerts: boolean;
  brandDealReminders: boolean;
  weeklyFinancialDigest: boolean;
}

export interface UserProfileData {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  themePreference: ThemeMode;
  notificationPreferences: NotificationPreferences;
  businessIdentity?: Partial<BusinessIdentity>;
  taxProfile?: Partial<TaxProfile>;
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  emailAlerts: true,
  gstThresholdWarning: true,
  basFilingReminders: true,
  superannuationDueAlerts: true,
  brandDealReminders: true,
  weeklyFinancialDigest: false,
};

export type AuthUser = {
  id: string;
  uid: string;
  email: string;
  name: string;
  displayName: string;
  image?: string | null;
  photoURL?: string | null;
  demo?: boolean;
};

interface StoredAccount {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

const ACCOUNTS_KEY = "talentos.accounts";
const SESSION_KEY = "talentos.session";

const DEMO_USER: AuthUser = {
  id: "demo-kira",
  uid: "demo-kira",
  email: "kira@studio.talentos",
  name: "Kira Zhang",
  displayName: "Kira Zhang",
  demo: true,
};

interface AuthContextType {
  user: AuthUser | null;
  userProfile: UserProfileData | null;
  loading: boolean;
  theme: ThemeMode;
  notificationPreferences: NotificationPreferences;
  setTheme: (theme: ThemeMode) => void;
  updateNotificationPreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  enterSampleStudio: () => void;
  logOut: () => Promise<void>;
  saveBusinessIdentity: (biz: BusinessIdentity, tax: TaxProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`talentos::${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toAuthUser(account: StoredAccount): AuthUser {
  return {
    id: account.id,
    uid: account.id,
    email: account.email,
    name: account.name,
    displayName: account.name,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreferences>(DEFAULT_NOTIFICATIONS);

  const profileFor = (authUser: AuthUser, prefs = notificationPreferences): UserProfileData => ({
    id: authUser.id,
    email: authUser.email,
    displayName: authUser.name || "Australian creator",
    photoURL: authUser.image || undefined,
    themePreference: theme,
    notificationPreferences: prefs,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const applyTheme = (mode: ThemeMode) => {
    const isDark =
      mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  };

  useEffect(() => {
    const storedTheme = (localStorage.getItem("talentos.theme") as ThemeMode | null) || "light";
    const prefs = readJson("talentos.notifications", DEFAULT_NOTIFICATIONS);
    setThemeState(storedTheme);
    setNotificationPreferences(prefs);
    applyTheme(storedTheme);

    const session = readJson<AuthUser | null>(SESSION_KEY, null);
    if (session?.id) {
      setUser(session);
      setUserProfile(profileFor(session, prefs));
    }
    setLoading(false);
    // Hydrate once on the client. profileFor closes over the initial theme/prefs we just read.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("talentos.theme", theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const updateNotificationPreferences = async (prefs: Partial<NotificationPreferences>) => {
    const updated = { ...notificationPreferences, ...prefs };
    setNotificationPreferences(updated);
    localStorage.setItem("talentos.notifications", JSON.stringify(updated));
    setUserProfile((prev) => (prev ? { ...prev, notificationPreferences: updated } : prev));
  };

  const persistSession = (next: AuthUser | null) => {
    setUser(next);
    setUserProfile(next ? profileFor(next) : null);
    if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else localStorage.removeItem(SESSION_KEY);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    if (!cleanEmail.includes("@") || pass.length < 8 || cleanName.length < 2) {
      throw new Error("Use a real email, a display name, and a password of at least 8 characters.");
    }
    const accounts = readJson<StoredAccount[]>(ACCOUNTS_KEY, []);
    if (accounts.some((a) => a.email === cleanEmail)) {
      throw new Error("An account with that email already exists. Sign in instead.");
    }
    const account: StoredAccount = {
      id: `usr-${crypto.randomUUID()}`,
      email: cleanEmail,
      name: cleanName,
      passwordHash: await hashPassword(pass),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
    persistSession(toAuthUser(account));
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const accounts = readJson<StoredAccount[]>(ACCOUNTS_KEY, []);
    const account = accounts.find((a) => a.email === cleanEmail);
    if (!account) throw new Error("No account for that email. Create one, or open the sample studio.");
    const hashed = await hashPassword(pass);
    if (hashed !== account.passwordHash) throw new Error("That password doesn’t match.");
    persistSession(toAuthUser(account));
  };

  const enterSampleStudio = () => {
    persistSession(DEMO_USER);
  };

  const logOut = async () => {
    persistSession(null);
  };

  const saveBusinessIdentity = async (biz: BusinessIdentity, tax: TaxProfile) => {
    setUserProfile((prev) =>
      prev ? { ...prev, businessIdentity: biz, taxProfile: tax, updatedAt: new Date().toISOString() } : null,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        theme,
        notificationPreferences,
        setTheme,
        updateNotificationPreferences,
        signUpWithEmail,
        signInWithEmail,
        enterSampleStudio,
        logOut,
        saveBusinessIdentity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
