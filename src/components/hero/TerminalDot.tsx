"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A small accent-blue dot. On hover it drops a little and unfolds (to the
 * left, so it never overflows the viewport edge) into a tiny prompt that
 * types `> siddhesh_`. All motion lives in CSS (.tdot in globals.css):
 * clip-path + transform for the unfold, a stepped clip for the typing.
 *
 * Mouse: hover. Touch: tap toggles. Keyboard: focus reveals.
 */
export function TerminalDot({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // Pointer type of the press that led to the current click. Keyboard
  // activation has no pointerdown, so it stays null.
  const pressType = useRef<string | null>(null);

  return (
    <div
      className={cn("tdot", className)}
      data-open={open}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setOpen(false);
      }}
    >
      <button
        type="button"
        className="tdot__hit"
        aria-label="siddhesh"
        aria-pressed={open}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setOpen(true);
        }}
        onPointerDown={(e) => {
          pressType.current = e.pointerType;
        }}
        onClick={() => {
          // Mouse users already opened it on hover; touch and keyboard toggle.
          if (pressType.current !== "mouse") setOpen((v) => !v);
          pressType.current = null;
        }}
        onFocus={(e) => {
          if (e.currentTarget.matches(":focus-visible")) setOpen(true);
        }}
        onBlur={() => setOpen(false)}
      />
      <div className="tdot__box" aria-hidden="true">
        <span className="tdot__line">
          <span className="tdot__prompt">&gt;</span>
          <span className="tdot__type">siddhesh</span>
          <span className="tdot__cursor">_</span>
        </span>
      </div>
    </div>
  );
}
