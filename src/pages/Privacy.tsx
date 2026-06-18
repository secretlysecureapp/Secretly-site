import { useReveal } from '../hooks/useReveal'

export default function Privacy() {
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker">Legal</p>
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__sub">
            Effective Date: May 15, 2026 · Operator: SIA Secretly
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div className="prose">
            <p>
              This document describes what data Secretly collects, how it's used, and user
              rights regarding the Secretly service.
            </p>

            <h2>1. Introduction</h2>
            <p>
              Secretly is a private, encrypted messenger enabling message exchange, group chats,
              and secure voice/video calls using a Secretly ID, without requiring mandatory phone
              numbers or email addresses.
            </p>

            <h2>2. Data Controller and Contact Information</h2>
            <p><strong>Data Controller:</strong> Secretly</p>
            <p><strong>Legal Name and Address:</strong> SIA Secretly, 1–13 Pavila Rozisa iela, Valmiera, Valmieras novads, LV-4201, Latvia (LV)</p>
            <p><strong>Contacts:</strong></p>
            <ul>
              <li>Technical Support: technical.support@secretlyapp.com</li>
              <li>General Support: support@secretlyapp.com</li>
              <li>Legal/Law Enforcement Requests: legal@secretlyapp.com</li>
            </ul>

            <h2>3. What Data We Collect</h2>
            <h3>3.1 Registration Data</h3>
            <p>
              A randomly generated Secretly ID and, optionally, a profile name and avatar that
              you set. Secretly does not require — and does not ask for — a phone number or email
              address, and we do not collect them.
            </p>
            <h3>3.2 User Content</h3>
            <p>
              Messages, media (photos, videos), files, and attachments sent via Secretly. By
              default, message content is protected by end-to-end encryption and is not accessible
              to the service in plaintext.
            </p>
            <h3>3.3 Metadata and Identifiers</h3>
            <p>
              Random device and profile identifiers (UUIDs, not linked to any real-world
              identity), chat/room IDs, delivery metadata (sent/delivered timestamps, message
              size), delivery statuses, and push notification tokens when notifications are enabled.
            </p>
            <h3>3.4 Payments and Donations</h3>
            <p>
              Secretly may provide links to third-party payment providers for donations or
              payments. If you make a payment outside the application, it is processed by the
              selected provider. Secretly does not store full bank card details (card number, CVV).
              If digital goods or subscriptions are sold within the application, they are processed
              through platform solutions (Apple In-App Purchase on iOS, Google Play Billing on
              Android) in accordance with the respective app store policies.
            </p>
            <h3>3.5 Technical, Operational, and Service Data</h3>
            <p>
              IP addresses, request and error logs, security events, and rate-limiting data. This
              data is used to ensure service functionality, detect and prevent fraud, investigate
              incidents, and improve service quality.
            </p>
            <h3>3.6 Website Data</h3>
            <p>
              When you visit the website, limited technical data may be processed: IP address,
              browser type and version, basic request headers, and performance metrics. Only
              strictly necessary cookies for website security and functionality are used. No
              third-party behavioral tracking tools for advertising are employed.
            </p>
            <h3>3.7 Diagnostics and Analytics</h3>
            <p>
              Secretly does not use third-party analytics, advertising, or crash-reporting
              services in the app or on this website (see Section 18). We do not build behavioural
              profiles, and we use privacy-respecting, cookieless measurement at most for basic
              site health.
            </p>

            <h2>4. How We Use the Information</h2>
            <p>Collected data is used to:</p>
            <ul>
              <li>Provide messaging, calling, and related services</li>
              <li>Authenticate users and devices</li>
              <li>Deliver encrypted messages and notifications</li>
              <li>Provide user support and resolve technical issues</li>
              <li>Ensure security, as well as detect and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>5. Legal Bases for Processing (Where Applicable)</h2>
            <p>
              Depending on applicable law, processing may rely on one or more of the following
              legal bases: performance of a contract (to provide services), consent (for optional
              features), legitimate interests (such as security and fraud prevention), and
              compliance with legal obligations.
            </p>

            <h2>6. Encryption and Metadata</h2>
            <p>
              All user-generated content — text messages, voice messages, attachments, reactions,
              group messages, and call media — is end-to-end encrypted on the sender's device and
              decrypted only on the recipient's device. In normal operation, our servers do not
              have access to message content or call media in plaintext.
            </p>
            <p><strong>Cryptographic primitives used by Secretly:</strong></p>
            <ul>
              <li><strong>Identity keys:</strong> Ed25519 (digital signatures, long-term identity)</li>
              <li><strong>Key agreement:</strong> X25519 (Curve25519 Diffie-Hellman) for signed pre-keys, one-time pre-keys, and per-message DH ratchet steps</li>
              <li><strong>Initial handshake:</strong> X3DH-style triple Diffie-Hellman exchange to establish a fresh root key for each new conversation</li>
              <li><strong>Forward-secrecy ratchet:</strong> Signal-inspired Double Ratchet v3, advancing chain keys per message and root keys per DH step</li>
              <li><strong>Symmetric message encryption (AEAD):</strong> XChaCha20-Poly1305 (24-byte nonce, 16-byte authentication tag)</li>
              <li><strong>Key derivation:</strong> HKDF-SHA256 for ratchet keys; PBKDF2-HMAC-SHA256 for password-derived encryption (backups, recovery kit)</li>
              <li><strong>Hashing / integrity:</strong> SHA-256 and HMAC-SHA256</li>
              <li><strong>Local database at rest:</strong> SQLCipher (mobile) / SQLite3 Multiple Ciphers (desktop), AES-256 with the database key stored in platform secure storage (iOS Keychain / Android Keystore)</li>
              <li><strong>Encrypted backups (optional):</strong> AES-256-GCM, with the key derived from a user-chosen passphrase via PBKDF2-HMAC-SHA256</li>
              <li><strong>Transport security:</strong> TLS 1.3 for all client-server traffic; DTLS-SRTP (WebRTC standard) for media transport</li>
            </ul>
            <p><strong>Metadata visible to our servers (necessary for delivery and abuse prevention):</strong></p>
            <ul>
              <li>Sender and recipient device identifiers (random UUIDs, no phone number or email required)</li>
              <li>Message timestamps and delivery / read status</li>
              <li>Approximate message size (ciphertext length)</li>
              <li>IP address of the connecting device (used transiently for routing; not stored alongside message content)</li>
              <li>Push notification token (FCM / APNs) when notifications are enabled</li>
            </ul>
            <p>
              We minimise metadata retention — see Section 8 ("Data Retention Periods").
            </p>
            <p>
              <strong>Important:</strong> Encryption protects content in transit and at rest, but it
              cannot protect data if a recipient's device is compromised, if a user voluntarily
              discloses content, or if a user shares their recovery passphrase or recovery kit.
            </p>

            <h2>7. Third-Party Data Transfer and Processing</h2>
            <p>
              Personal data is not sold. Data may be transferred or processed with/for the
              following categories of providers and services:
            </p>
            <ul>
              <li>Infrastructure providers (hosting, S3, CDN)</li>
              <li>Push notification services (Apple APNs, Firebase Cloud Messaging)</li>
              <li>Audio/video providers (TURN/STUN/media relays)</li>
              <li>Payment providers (Stripe, PayPal, etc.)—only in case of external payment processing</li>
              <li>Support and communication services (email, ticketing systems)</li>
              <li>Analytics and monitoring services (if applicable)</li>
              <li>Legal authorities—only in response to a valid legal request</li>
            </ul>
            <p>
              Each third-party provider is selected based on security requirements, and appropriate
              data protection agreements are executed with them. A full list of vendors and links
              to their privacy policies is provided in the Key Vendor List in Section 18 below.
            </p>

            <h2>8. Data Retention Periods</h2>
            <p>
              Data is retained only for the period necessary to fulfill the purposes described in
              this Policy, unless otherwise required by law. Examples of recommended retention
              periods (replace with the actual values):
            </p>
            <ul>
              <li>Pending/undelivered messages (on the server): up to 30 days</li>
              <li>Copies for delivery/relay: deleted immediately after delivery, maximum 30 days</li>
              <li>Request and error logs: 30–90 days</li>
              <li>Security/audit logs: up to 365 days</li>
              <li>Backups: up to 180 days</li>
              <li>Account and profile data: stored until the account is deleted by the user, and thereafter to the extent required to comply with laws and legal obligations</li>
            </ul>
            <p>
              These periods may change due to legal requirements or for security purposes. For
              precise retention periods for a specific data type, contact
              technical.support@secretlyapp.com.
            </p>

            <h2>9. Deletion and User Choices</h2>
            <p>
              Because Secretly holds no personal profile about you, there is very little to erase —
              but you remain in control of the cryptographic identity registered for message
              delivery. In the app you can delete it via: Settings → Account → Delete Account. Upon
              deletion:
            </p>
            <ul>
              <li>Your profile ID, public keys, and device records are removed from our key registry</li>
              <li>Your push notification token is invalidated</li>
              <li>Any undelivered encrypted envelopes queued for you are purged within the retention periods below</li>
            </ul>
            <p>
              Deletion does not affect data that has already been transmitted to other users (e.g.,
              messages saved by recipients). Some data may be retained in backups or logs for a
              limited time to ensure security and comply with legal obligations.
            </p>

            <h2>10. User Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, rectify, erase,
              restrict processing, and port your data, as well as the right to withdraw your
              consent. In practice, because Secretly does not collect your name, phone number,
              email, or message content, a data subject request typically concerns only the limited
              technical data described in Section 3 (such as your random identifiers and push
              token). To submit a request, write to technical.support@secretlyapp.com. We aim to
              respond within 30 days, except for complex cases that legally allow for an extension.
            </p>

            <h2>11. International Transfers</h2>
            <p>
              All persistent server-side data (encrypted message mailbox, public-key registry,
              push tokens) is stored on servers physically located in Germany (European Union),
              operated by Hetzner Online GmbH. We do not replicate user data outside the EU.
            </p>
            <p>
              Data may be processed in countries other than your country of residence only to the
              extent strictly necessary (e.g., push delivery via Apple/Google or app distribution).
              Appropriate technical and legal safeguards (such as Standard Contractual Clauses) are
              ensured where required by law.
            </p>

            <h2>12. Children</h2>
            <p>
              Secretly is not intended for children under the age of 13 (or below the minimum age
              required by local law). If we learn that a child has registered without
              parental/guardian consent, we will take steps to delete the account and associated
              data.
            </p>

            <h2>13. Security</h2>
            <p>
              Organizational and technical security measures are implemented, including encryption,
              access controls, monitoring, and regular updates. However, no absolute guarantee of
              security exists—your security also depends on the strength of your passwords, device
              security, and online behavior.
            </p>
            <p>
              Beyond end-to-end encryption (Section 6), Secretly applies the following operational
              hardening:
            </p>
            <ul>
              <li>All client-server traffic is protected by TLS 1.3 with HSTS and Let's Encrypt-issued certificates.</li>
              <li>HTTP requests to authenticated endpoints are signed with the user's identity key (Ed25519) to prevent replay and impersonation.</li>
              <li>The local message database is encrypted at rest with SQLCipher / SQLite3 Multiple Ciphers using a key held in the platform secure enclave (iOS Keychain / Android Keystore).</li>
              <li>Push notifications carry no plaintext message content — only a wake signal and an opaque message identifier.</li>
              <li>Server-side push tokens are auto-invalidated when Apple/Google report the token as unregistered, so a stale device cannot be used to harvest delivery metadata.</li>
            </ul>

            <h2>14. Legal Requests and Data Disclosure</h2>
            <p>
              Personal data will be disclosed only in response to a valid legal request (e.g., a
              court order, subpoena) or if required by law. We strive to notify affected users
              prior to disclosure unless notification is prohibited by law.
            </p>
            <p>
              Legal requests should be directed to: support@secretlyapp.com. Please include contact
              information and the relevant legal documentation (court order, subpoena, etc.) in your
              request.
            </p>

            <h2>15. Updates to This Policy</h2>
            <p>
              This Policy may be updated from time to time. All material changes will be posted on
              this page with an updated effective date. Your continued use of the service after such
              changes constitutes acceptance of the updated policy.
            </p>

            <h2>16. Platform-Specific Notes (iOS / Android)</h2>
            <ul>
              <li>
                <strong>In-App Purchases:</strong> If digital goods or subscriptions are offered
                within the app, they are processed via Apple In-App Purchase on iOS and via Google
                Play Billing on Android, in accordance with the respective app store policies. If
                payments redirect to an external website, such payments are handled by an external
                provider, and Secretly does not store card data.
              </li>
              <li>
                <strong>No third-party sign-in:</strong> Secretly has no accounts and no social
                login. You are identified only by a cryptographic Secretly ID, so there is no
                Google, Facebook, or "Sign in with Apple" login to configure.
              </li>
              <li>
                <strong>VoIP and Push:</strong> For incoming calls to function properly,
                CallKit/PushKit (iOS) and FCM (Android) are used in accordance with platform
                guidelines. Push notifications do not contain decrypted message content.
              </li>
            </ul>

            <h2>17. Technical Description for Export Compliance</h2>
            <p>
              Secretly uses standard, publicly-available cryptographic primitives. The app
              qualifies for the U.S. export self-classification under ECCN 5D992.c (mass-market
              encryption) and the EU dual-use exemption analog.
            </p>
            <table>
              <thead>
                <tr><th>Purpose</th><th>Algorithm</th></tr>
              </thead>
              <tbody>
                <tr><td>Digital signatures (identity, message authentication)</td><td>Ed25519</td></tr>
                <tr><td>Diffie-Hellman key agreement</td><td>X25519 (Curve25519)</td></tr>
                <tr><td>Initial pairwise handshake</td><td>X3DH-style triple DH</td></tr>
                <tr><td>Per-message symmetric AEAD encryption</td><td>XChaCha20-Poly1305 (256-bit key, 192-bit nonce, 128-bit tag)</td></tr>
                <tr><td>Forward-secrecy ratchet</td><td>Custom Double Ratchet v3 (X25519 + HKDF-SHA256 + XChaCha20-Poly1305)</td></tr>
                <tr><td>Key derivation</td><td>HKDF-SHA256; PBKDF2-HMAC-SHA256 for password-based derivation</td></tr>
                <tr><td>Cryptographic hashing</td><td>SHA-256, HMAC-SHA256</td></tr>
                <tr><td>Local database encryption</td><td>AES-256 via SQLCipher (mobile) / SQLite3 Multiple Ciphers (desktop)</td></tr>
                <tr><td>Encrypted backup (optional)</td><td>AES-256-GCM with PBKDF2-HMAC-SHA256 key derivation</td></tr>
                <tr><td>Transport security</td><td>TLS 1.3 (HTTP / WebSocket); DTLS-SRTP (WebRTC media)</td></tr>
              </tbody>
            </table>
            <p>
              Secretly does not implement proprietary or non-standard cryptography. All algorithms
              listed are publicly specified (RFC, NIST, IRTF CFRG) and have widely-available
              open-source implementations. The cryptographic library used by the application is the
              open-source Dart cryptography package and platform-native libraries (Apple CryptoKit /
              Android Keystore APIs) for key storage.
            </p>

            <h2>18. Key Vendor List</h2>

            <h3>Hosting / Infrastructure</h3>
            <ul>
              <li>Hetzner Online GmbH — cloud servers located in Nuremberg, Germany — <a href="https://www.hetzner.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
            </ul>

            <h3>Push Notifications</h3>
            <ul>
              <li>Apple Push Notification Service (APNs) — for iOS devices, including VoIP push for calls — <a href="https://developer.apple.com/support/notifications/" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
              <li>Firebase Cloud Messaging (Google) — for Android devices — <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
            </ul>

            <h3>Media / Calls</h3>
            <ul>
              <li>Coturn (self-hosted) — open-source TURN/STUN server running on our own Hetzner infrastructure for WebRTC NAT traversal — <a href="https://github.com/coturn/coturn" target="_blank" rel="noopener noreferrer">project page</a></li>
              <li>LiveKit (self-hosted) — open-source SFU running on our own infrastructure for group calls — <a href="https://livekit.io/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
              <li>WebRTC (Google open-source library, embedded in the app, no data sent to Google) — <a href="https://webrtc.org/" target="_blank" rel="noopener noreferrer">webrtc.org</a></li>
            </ul>

            <h3>Payments (Android only)</h3>
            <p>
              Donations are accepted on Android via Donorbox; in-app donations on iOS are temporarily
              disabled pending native In-App Purchase integration.
            </p>
            <ul>
              <li>Donorbox — <a href="https://donorbox.org/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
              <li>Stripe (used internally by Donorbox for card processing) — <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
              <li>PayPal (alternative checkout via Donorbox) — <a href="https://www.paypal.com/legalhub/privacy-full" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
            </ul>

            <h3>Analytics / Crash Reports</h3>
            <p>
              None. Secretly does not use Sentry, Firebase Analytics, Firebase Crashlytics, Google
              Analytics, Mixpanel, Amplitude, PostHog, or any other third-party analytics or
              crash-reporting service. The Firebase SDK is bundled solely to support Firebase Cloud
              Messaging push notifications (see "Push Notifications" above).
            </p>

            <h3>TLS Certificate Authority</h3>
            <ul>
              <li>Let's Encrypt / Internet Security Research Group (ISRG) — free public CA, used to issue TLS certificates for our domains. No user data is ever sent to the CA. — <a href="https://letsencrypt.org/privacy/" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
            </ul>

            <h3>Application Distribution</h3>
            <ul>
              <li>Apple App Store / TestFlight — <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
              <li>Google Play Store — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
            </ul>

            <h2>19. Our Stance on Tracking and Advertising</h2>
            <p>
              No third-party advertising networks are used to display targeted ads inside the
              application. Personal data is not shared with third parties for ad targeting purposes.
              If this changes in the future, this Policy will be updated and users will be notified.
            </p>

            <h2>20. Contact</h2>
            <p>
              <a href="mailto:support@secretlyapp.com">support@secretlyapp.com</a>
              <br />
              https://www.secretlyapp.com
            </p>
            <p>
              SIA Secretly (Reg.No. 40203722244)
              <br />
              DUNS - 565891304
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
