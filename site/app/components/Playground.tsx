"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import SigComputation from "./SigComputation";

// fast pseudo-random hex string derived deterministically from input.
// uses webcrypto sha-256 chained 30 times to fill 944 bytes (real sphincs- sig size).
// not a real sphincs- signature — a believable visualization keyed to user input.
async function deriveFakeSig(msg: string, privSeed: string): Promise<string> {
  const enc = new TextEncoder();
  const target = 944; // bytes
  const out = new Uint8Array(target);
  let i = 0;
  let seed = enc.encode(privSeed + "::" + msg);
  while (i < target) {
    const hash = await crypto.subtle.digest("SHA-256", seed);
    const view = new Uint8Array(hash);
    const take = Math.min(32, target - i);
    out.set(view.subarray(0, take), i);
    i += take;
    seed = view;
  }
  return "0x" + Array.from(out).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function derivePubKey(privSeed: string): Promise<string> {
  const enc = new TextEncoder();
  const seed = enc.encode("pub::" + privSeed);
  const hash = await crypto.subtle.digest("SHA-256", seed);
  return "0x" + Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const SAMPLE_PRIV =
  "0xafaa19c33b21c4a7e0b1f7a51c8a02d8d3d5a2c1f0e8d7c6b5a4938271605948";

export default function Playground() {
  const [message, setMessage] = useState("hello, post-quantum");
  const [signature, setSignature] = useState<string>("");
  const [pubkey, setPubkey] = useState<string>("");
  const [state, setState] = useState<"idle" | "signing" | "signed" | "tampered">("idle");
  const pendingSigRef = useRef<string>("");

  // derive a stable pubkey on mount (looks like the deployer's key)
  useEffect(() => {
    derivePubKey(SAMPLE_PRIV).then(setPubkey);
  }, []);

  const handleSign = async () => {
    if (!message.trim()) return;
    setState("signing");
    setSignature("");
    pendingSigRef.current = "";
    // start the real computation in parallel with the cascade animation
    deriveFakeSig(message, SAMPLE_PRIV).then((sig) => {
      pendingSigRef.current = sig;
    });
  };

  const handleComputationDone = () => {
    // by the time the cascade finishes, the sig is almost certainly computed
    const finish = () => {
      setSignature(pendingSigRef.current);
      setState("signed");
    };
    if (pendingSigRef.current) finish();
    else {
      // very rare — webcrypto stalled. wait a bit more
      const id = setInterval(() => {
        if (pendingSigRef.current) {
          clearInterval(id);
          finish();
        }
      }, 60);
    }
  };

  const handleTamper = () => {
    // do NOT recompute signature — the message changed but the sig is the old one.
    setState("tampered");
  };

  const handleReset = () => {
    setState("idle");
    setSignature("");
    pendingSigRef.current = "";
  };

  const sigPreview = useMemo(() => {
    if (!signature) return "";
    // first 32 hex chars + ellipsis + last 16 hex chars
    return signature.slice(0, 34) + " … " + signature.slice(-16);
  }, [signature]);

  const isInputDisabled = state === "signing";

  return (
    <div className="playground">
      <div className="pg-row">
        <label className="pg-label">Message to seal</label>
        <input
          type="text"
          className="pg-input"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (state === "signed") setState("tampered");
            else if (state === "tampered" && e.target.value === "") setState("idle");
          }}
          placeholder="Type any text…"
          disabled={isInputDisabled}
          maxLength={200}
        />
      </div>

      <div className="pg-row">
        <label className="pg-label">Public key (mock)</label>
        <code className="pg-key">{pubkey || "loading…"}</code>
      </div>

      {state === "idle" && (
        <button className="pg-btn pg-btn-primary" onClick={handleSign}>
          Sign with SPHINCS-
        </button>
      )}

      {state === "signing" && (
        <SigComputation duration={3200} onComplete={handleComputationDone} />
      )}

      {(state === "signed" || state === "tampered") && (
        <>
          <div className="pg-row">
            <label className="pg-label">Cryptographic seal · 944 bytes</label>
            <code className="pg-sig">{sigPreview}</code>
          </div>
          <div
            className={`pg-verdict ${state === "signed" ? "ok" : "bad"}`}
            aria-live="polite"
          >
            <span className="pg-dot" />
            {state === "signed"
              ? "VERIFIED. The seal matches the message."
              : "INVALID. The message changed. The seal no longer holds."}
          </div>
          <div className="pg-actions">
            {state === "signed" && (
              <button className="pg-btn pg-btn-ghost" onClick={handleTamper}>
                Tamper the message
              </button>
            )}
            <button className="pg-btn pg-btn-ghost" onClick={handleReset}>
              Reset
            </button>
            <button className="pg-btn pg-btn-primary" onClick={handleSign}>
              Re-sign
            </button>
          </div>
        </>
      )}

      <p className="pg-note">
        Client-side demo. The seal shown is a deterministic mock derived
        from your message via WebCrypto SHA-256, believable in size and shape
        but not the full SPHINCS- engine, which runs server-side or in WASM
        in production. Real signing produces the same shape. A 944-byte
        hash bundle that proves you knew the private key without revealing it.
      </p>
    </div>
  );
}
