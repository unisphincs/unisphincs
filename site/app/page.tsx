import Marquee from "./components/Marquee";
import Terminal from "./components/Terminal";
import QuantumEta from "./components/QuantumEta";
import Reveal from "./components/Reveal";
import Playground from "./components/Playground";
import { XIcon, TelegramIcon, GitHubIcon, ForkIcon } from "./components/Icons";

function SphinxMark() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logo.svg"
      alt="unisphincs mark"
      width={170}
      height={128}
      style={{ display: "block" }}
    />
  );
}

export default function Page() {
  return (
    <>
      <div className="particles" aria-hidden>
        <span /><span /><span /><span /><span /><span />
      </div>
      <main className="page">
        <header className="hero">
          <div className="logo-mark">
            <SphinxMark />
          </div>
          <h1>
            <span className="brand-uni">Uni</span>
            <span className="brand-sphincs">Sphincs</span>
          </h1>
          <div className="tag">
            Post-quantum signatures for the next Ethereum. An open toolkit
            wrapped around <b>SPHINCS-</b>, the scheme{" "}
            <a
              href="https://github.com/vbuterin"
              target="_blank"
              rel="noopener noreferrer"
              className="vb-link"
            >
              Vitalik Buterin
            </a>{" "}
            published in May 2026 for EVM-friendly deployment.
          </div>
          <div className="cta-row">
            <a
              className="btn btn-icon btn-primary"
              href="https://x.com/UniSphincs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="twitter"
              title="twitter"
            >
              <XIcon size={20} />
            </a>
            <a
              className="btn btn-icon"
              href="https://t.me/unisphincs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="telegram"
              title="telegram"
            >
              <TelegramIcon size={20} />
            </a>
            <a
              className="btn btn-icon"
              href="https://github.com/unisphincs/unisphincs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github"
              title="github"
            >
              <GitHubIcon size={20} />
            </a>
            <a
              className="btn btn-icon"
              href="https://github.com/vbuterin/sphincsminus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="upstream (vbuterin/sphincsminus)"
              title="upstream — vbuterin/sphincsminus"
            >
              <ForkIcon size={20} />
            </a>
          </div>
          <p className="oracle">
            <span className="pulse" />
            The sphinx asks one question. Will your signature outlive the curve?
          </p>
          <QuantumEta />
        </header>

        <Marquee />

        <Reveal>
          <section id="try">
            <span className="section-tag try-tag">Try the seal</span>
            <h2>Sign a message right now.</h2>
            <p className="pg-intro">
              SPHINCS- locks a message to your private key. The output is a
              944-byte cryptographic seal bound to that exact text. Anyone with
              the public key can verify the seal. Change a single byte of the
              message after signing and the seal breaks. Forge a seal without
              the private key and verification fails.
            </p>
            <p className="pg-intro-sub">
              Type something below, press sign, then tamper the message to
              watch the seal collapse.
            </p>
            <Playground />
          </section>
        </Reveal>

        <Reveal>
          <aside className="vb-cite">
            <div className="vb-cite-head">
              <span className="vb-cite-tag">Cited</span>
              <a
                href="https://github.com/vbuterin/sphincsminus"
                target="_blank"
                rel="noopener noreferrer"
              >
                vbuterin/sphincsminus
              </a>
              <span className="vb-cite-date">May 11, 2026</span>
            </div>
            <blockquote className="vb-quote">
              “A minimal post-quantum stateless hash-based signature scheme
              optimized for EVM-friendly deployment.”
            </blockquote>
            <div className="vb-cite-foot">
              Vitalik Buterin, opening line of the upstream README. UniSphincs
              packages this implementation for builders.
            </div>
          </aside>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">01 · The riddle</span>
            <h2>Every Ethereum key breaks the day Q-Day arrives.</h2>
            <p>
              Every Ethereum signature today is an <b>ECDSA</b> signature over
              the <b>secp256k1</b> curve. When a sufficiently large quantum
              computer arrives, what NIST calls <b>Q-Day</b>, every secp256k1
              key is solvable in minutes. Every wallet exposed. Every contract
              ownership in question.
            </p>
            <p>
              The migration to post-quantum signatures is not optional. It is
              inevitable. The only question is whether the tooling exists by
              the time it is needed.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">02 · The answer</span>
            <h2>SPHINCS-: minimal, stateless, EVM-friendly.</h2>
            <p>
              <b>SPHINCS-</b> (SPHINCS minus) is a minimal stateless
              hash-based post-quantum signature scheme, designed by{" "}
              <a
                href="https://github.com/vbuterin/sphincsminus"
                target="_blank"
                rel="noopener noreferrer"
                className="vb-link"
              >
                Vitalik Buterin
              </a>{" "}
              and optimized for EVM-friendly deployment. The reference
              implementation lives in the upstream repo as{" "}
              <code>sphincs_minus.py</code>, accompanied by a{" "}
              <code>SphincsMinus.lean</code> formal verification in Lean 4 and
              a public set of known-answer test vectors.
            </p>

            <div className="spec-grid">
              <div className="spec-item">
                <div className="label">signature</div>
                <div className="value">944 bytes</div>
              </div>
              <div className="spec-item">
                <div className="label">private key</div>
                <div className="value">32 bytes</div>
              </div>
              <div className="spec-item">
                <div className="label">primitive</div>
                <div className="value">keccak256</div>
              </div>
              <div className="spec-item">
                <div className="label">security</div>
                <div className="value">nist L1</div>
              </div>
              <div className="spec-item">
                <div className="label">hypertree</div>
                <div className="value">d=2</div>
              </div>
              <div className="spec-item">
                <div className="label">curves used</div>
                <div className="value">zero</div>
              </div>
            </div>

            <ul className="feature-list">
              <li>No elliptic curves, no pairings, no exotic assumptions.</li>
              <li>Only Ethereum-native hash primitives.</li>
              <li>Python reference plus Lean 4 formal verification.</li>
              <li>Known-answer test vectors included.</li>
            </ul>

            <p>See it sign in real time.</p>
            <Terminal />
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">03 · Why UniSphincs</span>
            <h2>We package the work for builders.</h2>
            <p>
              We forked SPHINCS- and wrapped it in everything a builder needs
              to ship. A clean repository. Attribution to the cryptographer
              who wrote it. A landing page. A browser playground. Forthcoming
              JavaScript bindings and a Solidity verifier contract for
              uniswap v4 hook integration.
            </p>
            <p>
              The sphinx is the keeper at the gate. It knows the riddle
              before the traveller arrives. We are the keepers behind the
              keeper. Not the ones who solved the problem, but the ones who
              carry the answer forward to the builders who need it.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">04 · Attribution</span>
            <h2>Credit where credit is due.</h2>
            <p>
              This repository is a public fork of{" "}
              <a
                href="https://github.com/vbuterin/sphincsminus"
                target="_blank"
                rel="noopener noreferrer"
              >
                vbuterin/sphincsminus
              </a>
              . Every cryptographic file is the work of Vitalik Buterin and
              the SPHINCS- paper authors. UniSphincs adds a rebranded README,
              this landing, full attribution, and a permissive license that
              applies only to our additions.
            </p>
            <p>
              If Vitalik Buterin or any of the original authors request
              changes, we comply immediately. See{" "}
              <a
                href="https://github.com/unisphincs/unisphincs/blob/main/ATTRIBUTION.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                ATTRIBUTION.md
              </a>{" "}
              in the repo.
            </p>
            <blockquote>
              A minimal post-quantum stateless hash-based signature scheme
              optimized for EVM-friendly deployment.
              <cite>vbuterin/sphincsminus, May 2026</cite>
            </blockquote>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">05 · References</span>
            <h2>Read the source.</h2>
            <ul className="feature-list">
              <li>
                <a
                  href="https://github.com/vbuterin/sphincsminus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vbuterin/sphincsminus
                </a>
                . Vitalik Buterin's reference implementation in Python and
                Lean 4.
              </li>
              <li>
                <a
                  href="https://github.com/vbuterin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/vbuterin
                </a>
                . Vitalik's personal GitHub, where SPHINCS- and the wider
                Ethereum research drafts live.
              </li>
              <li>
                SPHINCS-: Efficient Stateless Post-Quantum Signatures. The
                research paper, included in the upstream repo.
              </li>
              <li>
                <a
                  href="https://github.com/unisphincs/unisphincs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  unisphincs/unisphincs
                </a>
                . This fork.
              </li>
              <li>
                <a
                  href="https://csrc.nist.gov/projects/post-quantum-cryptography"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NIST Post-Quantum Cryptography Programme
                </a>
                . The broader context for the migration.
              </li>
            </ul>
          </section>
        </Reveal>

        <footer>
          <p>
            UniSphincs · Cryptography by vbuterin · Tooling by unisphincs · 2026
          </p>
          <div className="channels">
            <a
              href="https://github.com/unisphincs/unisphincs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github"
              title="github"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href="https://x.com/UniSphincs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="twitter"
              title="twitter"
            >
              <XIcon size={18} />
            </a>
            <a
              href="https://t.me/unisphincs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="telegram"
              title="telegram"
            >
              <TelegramIcon size={18} />
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
