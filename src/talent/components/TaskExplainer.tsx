import React from "react";
import { GlassModal } from "./glass/Modal";
import { GlassButton, StatusIcon, SectionLabel } from "./glass/Glass";
import { relativeDay } from "../lib/format";
import type { TaskItem } from "../lib/store";

export const TaskExplainer: React.FC<{ task: TaskItem | null; onClose: () => void }> = ({ task, onClose }) => {
  if (!task) return null;
  return (
    <GlassModal open={!!task} onClose={onClose} labelledBy="task-title">
      <div className="flex items-start gap-3 pr-8">
        <StatusIcon tone={task.tone} className="mt-0.5 h-9 w-9" />
        <div>
          <h2 id="task-title" className="font-display text-lg font-bold text-ink text-balance">{task.title}</h2>
          <p className="mt-1 text-sm text-muted text-pretty">{task.summary}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4 rounded-xl bg-white/[0.03] p-4">
        <div>
          <SectionLabel>Why this matters</SectionLabel>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/90 text-pretty">{task.why}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/8 pt-4">
          <div>
            <SectionLabel>Source</SectionLabel>
            <p className="mt-1 text-sm text-ink">{task.source}</p>
          </div>
          <div>
            <SectionLabel>Last checked</SectionLabel>
            <p className="mt-1 text-sm text-ink">{task.lastChecked}</p>
          </div>
        </div>
      </div>

      {task.action && (
        <div className="mt-5">
          <SectionLabel>What to do</SectionLabel>
          <p className="mt-1.5 text-sm text-muted text-pretty">{task.action}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        {task.due ? (
          <span className="text-xs text-faint">Due {relativeDay(task.due)}</span>
        ) : (
          <span />
        )}
        <GlassButton variant="primary" onClick={onClose}>Got it</GlassButton>
      </div>
    </GlassModal>
  );
};
