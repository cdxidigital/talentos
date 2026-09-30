import {
  Home,
  Wallet,
  Briefcase,
  HandCoins,
  Receipt,
  FolderClosed,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type TabId = "home" | "money" | "jobs" | "getpaid" | "tax" | "files" | "settings";

export interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
  primary: boolean; // shown in mobile bottom bar
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home, primary: true },
  { id: "money", label: "Money", icon: Wallet, primary: true },
  { id: "jobs", label: "Jobs", icon: Briefcase, primary: true },
  { id: "getpaid", label: "Get Paid", icon: HandCoins, primary: true },
  { id: "tax", label: "Tax", icon: Receipt, primary: true },
  { id: "files", label: "Files", icon: FolderClosed, primary: false },
  { id: "settings", label: "Settings", icon: Settings, primary: false },
];
