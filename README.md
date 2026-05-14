<div align="center">

```
██╗   ██╗███╗   ██╗██╗███████╗██████╗ ██╗  ██╗██╗███╗   ██╗ ██████╗███████╗
██║   ██║████╗  ██║██║██╔════╝██╔══██╗██║  ██║██║████╗  ██║██╔════╝██╔════╝
██║   ██║██╔██╗ ██║██║███████╗██████╔╝███████║██║██╔██╗ ██║██║     ███████╗
██║   ██║██║╚██╗██║██║╚════██║██╔═══╝ ██╔══██║██║██║╚██╗██║██║     ╚════██║
╚██████╔╝██║ ╚████║██║███████║██║     ██║  ██║██║██║ ╚████║╚██████╗███████║
 ╚═════╝ ╚═╝  ╚═══╝╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
```

**post-quantum signatures for the next ethereum**

a uniswap-ready toolkit around **sphincs-**, built on top of vitalik buterin's reference implementation.

[website](https://unisphincs.vercel.app) · [twitter](https://x.com/UniSphincs) · [upstream](https://github.com/vbuterin/sphincsminus) · [research paper](./SPHINCS-%20_%20Efficient%20Stateless%20Post-Quantum%20Signat.md) · [attribution](./ATTRIBUTION.md)

</div>

---

## the riddle

every ethereum signature today is an **ecdsa** signature over the **secp256k1** curve. when a sufficiently large quantum computer arrives — what nist calls **q-day** — every secp256k1 key is solvable in minutes. every wallet exposed. every contract ownership in question.

the migration to post-quantum signatures is not optional. the only question is whether the tooling exists by the time it is needed.

## the answer

**sphincs-** (sphincs-minus) is a minimal stateless hash-based post-quantum signature scheme, designed by vitalik buterin and **explicitly optimized for evm-friendly deployment**. it uses only what ethereum already has — keccak256 — and nothing it doesn't.

| spec | sphincs- | ecdsa (today) |
| ---- | -------- | ------------- |
| signature size | 944 bytes | 65 bytes |
| public key | variable | 33 bytes |
| security level | nist L1 (128-bit) | 128-bit classical |
| **quantum-secure?** | **yes** | **no** |
| primitive | keccak256 / sha3-256 | secp256k1 ecdlp |
| stateless | yes | yes |
| formally verified | yes (lean 4) | partial |

## quick start

```bash
# generate a keypair
python sphincs_minus.py keygen

# sign a message
python sphincs_minus.py sign 0x<priv> "hello, post-quantum" /tmp/sig.bin

# verify
python sphincs_minus.py verify 0x<pub> "hello, post-quantum" /tmp/sig.bin
# → VERIFIED

# tamper detection
python sphincs_minus.py verify 0x<pub> "tampered" /tmp/sig.bin
# → INVALID
```

formal verification via lean 4:

```bash
lake build Examples.SphincsMinus.CLI
```

## what is in this repo

```
├── sphincs_minus.py        # reference python implementation       (upstream)
├── SphincsMinus.lean       # formal verification in lean 4         (upstream)
├── SphincsMinus/           # supporting lean modules               (upstream)
├── test_vector.json        # known-answer test vectors             (upstream)
├── verify_test_vector.py   # test vector runner                    (upstream)
├── lakefile.lean           # lean build manifest                   (upstream)
├── SPHINCS-_paper.md       # research paper                        (upstream)
├── UPSTREAM_README.md      # vbuterin's original readme            (upstream)
│
├── README.md               # you are here                          (added)
├── ATTRIBUTION.md          # credit and provenance                 (added)
├── LICENSE                 # mit, for additions only               (added)
└── site/                   # next.js landing                       (added)
```

every file marked **upstream** is the work of vitalik buterin and the sphincs- paper authors. see [`ATTRIBUTION.md`](./ATTRIBUTION.md) for full provenance.

## roadmap

- [x] public fork + attribution
- [x] landing page with quantum-eta timer and live signing demo
- [ ] typescript sdk wrapping the python reference
- [ ] browser-based playground (sign / verify in webcrypto)
- [ ] solidity verifier contract
- [ ] gas benchmarks vs ecdsa precompile
- [ ] eip draft proposal
- [ ] ethereum wallet integration spec
- [ ] security audit of the sdk and verifier

contributions welcome on any line item. open an issue first if it is non-trivial.

## attribution

the cryptography is not ours. unisphincs is a **fork-and-package** effort.

cite the sphincs- paper, not unisphincs, when discussing the cryptography itself.

> a minimal post-quantum stateless hash-based signature scheme optimized for evm-friendly deployment.
>
> — `vbuterin/sphincsminus`, may 2026

if vitalik buterin or any of the original authors request changes or attribution adjustments, we comply immediately. see [`ATTRIBUTION.md`](./ATTRIBUTION.md).

## license

**mit** for additions: `README.md`, `ATTRIBUTION.md`, `LICENSE`, `site/`, and any future `sdk/` or `examples/`.

upstream content (`sphincs_minus.py`, `SphincsMinus.lean`, lean modules, test vectors, paper, original readme) remains the work of vitalik buterin and the sphincs- paper authors and is **not relicensed** by unisphincs.

---

<div align="center">
<sub>unisphincs · cryptography by <a href="https://github.com/vbuterin">vbuterin</a> · tooling by <a href="https://github.com/unisphincs">unisphincs</a> · 2026</sub>
</div>
