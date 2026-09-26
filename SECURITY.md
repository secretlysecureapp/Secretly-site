# Security Policy

Secretly is a privacy-first messenger. We take security reports seriously and
appreciate responsible disclosure.

## Reporting a vulnerability

Please email **security@secretlyapp.com** with:

- a description of the issue and its impact,
- steps to reproduce (proof-of-concept if possible),
- affected versions / platforms.

We aim to acknowledge reports promptly and will keep you updated as we
investigate. Please give us a reasonable window to fix the issue before any
public disclosure, and avoid accessing or modifying other users' data.

For general (non-security) support, use support@secretlyapp.com.

## Scope

This repository contains the **marketing website** (MIT-licensed). Reports about
the Secretly messenger apps and servers are also welcome at the same address.

## Encryption

Messages, files and one-to-one calls are end-to-end encrypted with a Double
Ratchet (our own implementation, not yet independently audited). Group calls
are encrypted in transit only, for now. See https://www.secretlyapp.com/security
and the threat model in the app repository
(https://github.com/Arkhanhel/Secretly/blob/main/docs/THREAT_MODEL.md).
