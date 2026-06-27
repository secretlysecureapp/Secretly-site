---
title: "How end-to-end encryption works in Secretly"
date: "2026-06-24"
excerpt: "End-to-end encryption is more than a checkbox. Here's what actually happens when you send a message — in plain language."
author: "The Secretly Team"
tags: "Security, Encryption"
---

"End-to-end encrypted" is printed on a lot of apps. It's worth understanding what it really means — and what Secretly does to earn the label.

## The short version

End-to-end encryption (E2EE) means a message is encrypted on **your** device and can only be decrypted on the **recipient's** device. Nobody in between — not the network, not the relay server, not Secretly — can read it. The server only ever sees ciphertext.

## The keys never leave your device

Secretly uses **Signal-class** cryptography built on the Double Ratchet algorithm — the same family of protocols trusted by the most respected secure messengers.

- Your private keys are generated and stored **on your device**, in secure storage.
- We never see them, and they're never uploaded.
- Each conversation negotiates its own keys directly between devices.

## Forward secrecy: every message gets a fresh key

The "ratchet" part matters. With every message, the keys advance one step forward and the previous key is discarded. This is called **forward secrecy**:

- If a key were ever compromised, it couldn't be used to decrypt past messages.
- Each message is locked with a key that exists for only a moment.

## Zero-knowledge servers

Secretly's relay exists to pass encrypted blobs between devices when one is offline — nothing more. It can't read message contents, and it isn't a store of your conversations. Because identity is just an anonymous [Secretly ID](/blog/why-no-phone-number), there's no name or number attached to the traffic either.

## Verifying your contacts

For the highest assurance, Secretly lets you compare a **safety number / fingerprint** with your contact (in person or over another channel). If it matches, you have cryptographic proof there's no one in the middle.

## Honesty about audits

Strong protocols are necessary but not sufficient — implementation matters. We're committed to an independent security audit, and we publish the current status openly on our [security page](/security) rather than claiming a review that hasn't happened yet.

Encryption you can reason about is encryption you can trust.
