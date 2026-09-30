import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cx } from "./Glass";

interface GlassModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  size?: "sm" | "md" | "lg";
  align?: "center" | "top";
  showClose?: boolean;
}

const SIZE = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export const GlassModal: React.FC<GlassModalProps> = ({
  open,
  onClose,
  children,
  labelledBy,
  size = "md",
  align = "center",
  showClose = true,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cx(
        "fixed inset-0 z-[100] flex justify-center px-4 py-6 sm:py-10 overflow-y-auto",
        align === "center" ? "items-start sm:items-center" : "items-start"
      )}
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cx(
          "glass-elevated animate-sheet relative z-10 w-full p-6 sm:p-7",
          SIZE[size]
        )}
      >
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/8 hover:text-ink transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
