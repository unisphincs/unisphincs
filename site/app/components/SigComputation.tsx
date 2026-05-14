"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** total duration of the cascade in ms before completion */
  duration?: number;
  /** called once the animation completes — playground swaps to signed state */
  onComplete?: () => void;
};

const HEX = "0123456789abcdef";
const COLS = 32;
const ROWS = 5;
const TOTAL = ROWS * COLS;

const STAGES = [
  "initializing fors+c trees",
  "computing wots+c chains",
  "binding signature to message",
  "assembling d=2 hypertree",
];

function randHex() {
  return HEX[Math.floor(Math.random() * 16)];
}

export default function SigComputation({ duration = 3200, onComplete }: Props) {
  // grid of hex chars, all start random
  const [cells, setCells] = useState<string[]>(() =>
    Array.from({ length: TOTAL }, () => randHex())
  );
  // how many cells are locked (left-to-right, top-to-bottom)
  const [lockedCount, setLockedCount] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let done = false;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / duration);

      // ease-out so end feels deliberate
      const eased = 1 - Math.pow(1 - t, 2.2);
      const targetLocked = Math.floor(eased * TOTAL);
      setLockedCount(targetLocked);

      // stage cycles based on progress
      const stage = Math.min(STAGES.length - 1, Math.floor(eased * STAGES.length));
      setStageIdx(stage);

      // refresh the still-random cells
      setCells((prev) => {
        const next = prev.slice();
        for (let i = targetLocked; i < TOTAL; i++) {
          // refresh 30% of unlocked cells per tick — flicker effect
          if (Math.random() < 0.3) next[i] = randHex();
        }
        // lock newly-locked cells with stable values
        for (let i = 0; i < targetLocked; i++) {
          if (next[i] === undefined) next[i] = randHex();
        }
        return next;
      });

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (!done) {
        done = true;
        // small breath before parent state swaps to "signed"
        setTimeout(() => onComplete?.(), 280);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onComplete]);

  const pct = Math.round((lockedCount / TOTAL) * 100);

  return (
    <div className="sigcomp" aria-live="polite">
      <div className="sigcomp-head">
        <span className="sigcomp-stage">
          <span className="sigcomp-dot" />
          {STAGES[stageIdx]}
          <span className="sigcomp-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </span>
        <span className="sigcomp-pct">{pct.toString().padStart(2, "0")}%</span>
      </div>

      <div className="sigcomp-grid">
        {cells.map((ch, i) => {
          const locked = i < lockedCount;
          const cursor = i === lockedCount;
          return (
            <span
              key={i}
              className={
                "sigcomp-cell" +
                (locked ? " locked" : "") +
                (cursor ? " cursor" : "")
              }
            >
              {ch}
            </span>
          );
        })}
      </div>

      <div className="sigcomp-foot">
        <span>944 bytes · keccak256 · evm-native</span>
      </div>
    </div>
  );
}
