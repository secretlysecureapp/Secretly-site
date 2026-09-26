---
title: "Why Secretly doesn't ask for your phone number"
date: "2026-06-20"
excerpt: "Most messengers tie your identity to a phone number. Secretly doesn't — and that single design choice changes everything about your privacy."
author: "The Secretly Team"
tags: "Privacy, Identity"
---

Almost every mainstream messenger asks for one thing before you can say hello: your phone number. It feels normal. It is also the single biggest privacy leak in modern messaging.

## A phone number is an identity

Your number is tied to your real name, your billing address, your carrier, and often your physical location. When an app uses it as your account ID, your private conversations become linkable to *you* — by the app, by anyone who breaches it, and sometimes by the people you chat with.

It also exposes your social graph. "Find friends by contacts" features quietly upload your address book and reveal who you know.

## Secretly uses a random ID instead

When you install Secretly, the app generates a random **Secretly ID** on your device. That ID is how people reach you. There is:

- no phone number,
- no email,
- no real name,
- no account to sign into.

You share your ID (or a QR code) with the people you want to talk to, and that's it. Nothing about your identity is required to create it. Our server still sees technical data such as IP addresses and push tokens — our [privacy policy](/privacy) says what and for how long — but nothing we ask you for points back to you.

## What this means in practice

- **You can't be found by your number.** Nobody can look you up unless you turn on nickname search — it is off by default.
- **A breach reveals far less.** There's no directory of phone numbers or emails to steal — though, like any messenger, our server holds routing data such as which device talks to which.
- **You stay in control of your social graph.** Your address book is never uploaded; optional contact sync only writes to your phone.

## "But how do you stop spam without a number?"

Phone-number verification is mostly a convenience for the *platform*, not a real security control. Secretly relies on the fundamentals instead: messages from people you haven't added wait in Requests, you can block anyone, end-to-end encryption protects every message, and there's no public directory to scrape.

Privacy shouldn't start with handing over the most identifying number you own. With Secretly, it doesn't.

[See how our encryption works →](/blog/how-encryption-works)
