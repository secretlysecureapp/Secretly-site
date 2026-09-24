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

## Your keys stay on your device

Secretly's end-to-end encryption is built on the **Double Ratchet** algorithm — the same design used by the most respected secure messengers. The implementation is our own and has not been independently audited yet.

- Your private keys are generated and stored **on your device**, in secure storage.
- We never see them in readable form. If you choose to back up to our server, the backup is encrypted with your password before it leaves your device.
- Each conversation negotiates its own keys from signed prekeys the devices publish — our server passes them along but cannot compute the result.

## Forward secrecy: every message gets a fresh key

The "ratchet" part matters. With every message, the keys advance one step forward and the previous key is discarded. This is called **forward secrecy**:

- If a key were ever compromised, it couldn't be used to decrypt past messages.
- Each message is locked with a key that exists for only a moment.

## What the server can and can't see

Secretly's relay passes encrypted messages between devices and keeps them only until they are delivered. It can't read message contents. It does see routing information — which device sends to which, when, and how large the message is — plus your display name and a group's title, which it uses for notification titles. Because your account is a random [Secretly ID](/blog/why-no-phone-number), there's no phone number or email attached to the traffic. Our [threat model](https://github.com/Arkhanhel/Secretly/blob/HEAD/docs/THREAT_MODEL.md) lists all of this in detail.

One-to-one calls are end-to-end encrypted too. Group calls are the exception: they are relayed by our media server and encrypted in transit, not end-to-end.

## Verifying your contacts

For the highest assurance, Secretly lets you compare a **safety number / fingerprint** with your contact (in person or over another channel). If it matches, you know you hold your contact's real keys. Secretly also warns you when a contact's key changes, and can require verification before you send.

## Honesty about audits

Strong protocols are necessary but not sufficient — implementation matters. We're committed to an independent security audit, and we publish the current status openly on our [security page](/security) rather than claiming a review that hasn't happened yet.

Encryption you can reason about is encryption you can trust.
