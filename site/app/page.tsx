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
            post-quantum signatures for the next ethereum. uniswap-ready
            toolkit around sphincs-.
          </div>
          <div className="cta-row">
            <a
              className="btn btn-icon btn-primary"
              href="https://x.com/UniSphincs"
              aria-label="twitter"
              title="twitter"
            >
              <XIcon size={20} />
            </a>
            <a
              className="btn btn-icon"
              href="#"
              aria-label="telegram (soon)"
              title="telegram (soon)"
            >
              <TelegramIcon size={20} />
            </a>
            <a
              className="btn btn-icon"
              href="https://github.com/unisphincs/unisphincs"
              aria-label="github"
              title="github"
            >
              <GitHubIcon size={20} />
            </a>
            <a
              className="btn btn-icon"
              href="https://github.com/vbuterin/sphincsminus"
              aria-label="upstream (vbuterin/sphincsminus)"
              title="upstream — vbuterin/sphincsminus"
            >
              <ForkIcon size={20} />
            </a>
          </div>
          <p className="oracle">
            <span className="pulse" />
            the sphinx asks one question: will your signature outlive the curve?
          </p>
          <QuantumEta />
        </header>

        <Marquee />

        <Reveal>
          <section>
            <span className="section-tag">01 · the riddle</span>
            <h2>every ethereum key breaks the day q-day arrives</h2>
            <p>
              every ethereum signature today is an <b>ecdsa</b> signature over
              the <b>secp256k1</b> curve. when a sufficiently large quantum
              computer arrives — what nist calls <b>q-day</b> — every
              secp256k1 key is solvable in minutes. every wallet exposed.
              every contract ownership in question.
            </p>
            <p>
              the migration to post-quantum signatures is not optional. it is
              inevitable. the only question is whether the tooling exists by
              the time it is needed.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">02 · the answer</span>
            <h2>sphincs-: minimal, stateless, evm-friendly</h2>
            <p>
              <b>sphincs-</b> (sphincs-minus) is a minimal stateless
              hash-based post-quantum signature scheme, designed by vitalik
              buterin and optimized for evm-friendly deployment.
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
              <li>no elliptic curves, no pairings, no exotic assumptions</li>
              <li>only ethereum-native hash primitives</li>
              <li>python reference + lean 4 formal verification</li>
              <li>known-answer test vectors included</li>
            </ul>

            <p>see it sign in real time:</p>
            <Terminal />

            <h3 style={{ marginTop: "2.5rem" }}>or sign your own message →</h3>
            <Playground />
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">03 · why unisphincs</span>
            <h2>we package the work for builders</h2>
            <p>
              we forked sphincs- and wrapped it in everything a builder needs
              to ship: clean repository, attribution, landing, and
              forthcoming javascript bindings and a solidity verifier
              contract.
            </p>
            <p>
              the sphinx is the keeper at the gate. it knows the riddle
              before the traveller arrives. we are the keeper at the gate of
              the post-quantum age — not the one who solved it, but the one
              who carries the answer forward.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">04 · attribution</span>
            <h2>credit where credit is due</h2>
            <p>
              this repository is a public fork of{" "}
              <a href="https://github.com/vbuterin/sphincsminus">
                vbuterin/sphincsminus
              </a>
              . every cryptographic file is the work of vitalik buterin and
              the sphincs- paper authors. unisphincs adds: a rebranded readme,
              this landing, full attribution, and a permissive license for
              the additions only.
            </p>
            <p>
              if vitalik buterin or any of the original authors request
              changes, we comply immediately. see{" "}
              <a href="https://github.com/unisphincs/unisphincs/blob/main/ATTRIBUTION.md">
                ATTRIBUTION.md
              </a>{" "}
              in the repo.
            </p>
            <blockquote>
              a minimal post-quantum stateless hash-based signature scheme
              optimized for evm-friendly deployment.
              <cite>— vbuterin/sphincsminus, may 2026</cite>
            </blockquote>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <span className="section-tag">05 · references</span>
            <h2>read the source</h2>
            <ul className="feature-list">
              <li>
                <a href="https://github.com/vbuterin/sphincsminus">
                  vbuterin/sphincsminus
                </a>{" "}
                — reference implementation (python + lean 4)
              </li>
              <li>
                sphincs-: efficient stateless post-quantum signatures
                (research paper, included in repo)
              </li>
              <li>
                <a href="https://github.com/unisphincs/unisphincs">
                  unisphincs/unisphincs
                </a>{" "}
                — this fork
              </li>
              <li>
                <a href="https://csrc.nist.gov/projects/post-quantum-cryptography">
                  nist pqc programme
                </a>{" "}
                — the broader post-quantum migration context
              </li>
            </ul>
          </section>
        </Reveal>

        <footer>
          <p>
            unisphincs · cryptography by vbuterin · tooling by unisphincs · 2026
          </p>
          <div className="channels">
            <a
              href="https://github.com/unisphincs/unisphincs"
              aria-label="github"
              title="github"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href="https://x.com/UniSphincs"
              aria-label="twitter"
              title="twitter"
            >
              <XIcon size={18} />
            </a>
            <a href="#" aria-label="telegram (soon)" title="telegram (soon)">
              <TelegramIcon size={18} />
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
