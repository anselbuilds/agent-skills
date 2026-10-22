# Practice claims

Synthetic claims for trying the skill. They contain no personal data. Some are deliberately wrong, some are meant to be true. The full answer key is in `docs/red-team-gate/VALIDATION.md` in the repository, outside this folder. `example-report.md` in this folder shows the answer to P5.

Use one claim per review. Give the reviewer only the claim, its stated support, and the method cards; never give it this folder.

## P1 (empirical)

HTTP status code 418 ("I'm a teapot") originates in RFC 2324, the Hyper Text Coffee Pot Control Protocol (HTCPCP/1.0), published on 1 April 1998; the status code was defined there as a joke, and RFC 2324 was never a standards-track specification.

## P2 (empirical)

TLS 1.3 (RFC 8446) guarantees forward secrecy for all traffic it protects: static-RSA key transport was removed, and every remaining way of establishing keys, including session resumption, mixes in a fresh ephemeral Diffie-Hellman share, so compromise of a server's long-term key can never expose recorded past sessions.

## P3 (conceptual)

In Lakatos's methodology of scientific research programmes, a programme is progressive when its successive modifications to the protective belt predict novel facts, at least some of which are subsequently corroborated, and degenerating when its modifications only accommodate already-known anomalies after the fact. Lakatos thereby treats the pattern of theory change over time, not any single falsifying observation, as the unit to which scientific evaluation applies.

## P4 (conceptual)

Karl Popper's demarcation criterion is that a theory is scientific if and only if it is verifiable by observation. Falsifiability is simply the logical converse of verifiability, so the two criteria always classify theories identically, and Popper's contribution was to rename the logical positivists' verifiability criterion rather than to replace it.

## P5 (definitional)

Since Python 3.6, the language specification itself guarantees that built-in dict objects preserve insertion order, so portable code targeting any conforming Python implementation from 3.6 onward may rely on it.

## P6 (framework)

The 4C review model (Context, Claims, Counterpoints, Commitments) explains why review meetings fail: every failed review skipped at least one of the four steps. Teams that adopt all four steps stop having failed reviews. When a team that uses all four steps still has a failed review, that shows the team applied at least one step only superficially.

Stated support: in three teams that adopted the model, the facilitator judged most later reviews successful, and each failure the facilitator examined could be traced to a step done superficially.

## P7 (normative)

Teams should require every code change to be approved by two reviewers before it is merged, because two reviewers catch more defects than one.

## P8 (definitional)

In Python 3.7 and later, preservation of insertion order by the built-in dict is part of the language specification rather than an implementation detail.
