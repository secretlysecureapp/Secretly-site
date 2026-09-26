import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

/* ════════════════════════════════════════════════════════════════
   /dpa — Data Processing Agreement (GDPR Article 28) for Teams.

   English only, like every B2B contract we sign. The Teams page
   sells to legal, healthcare, journalism and finance — all four
   ask for a DPA before they sign anything, and until now there
   was none to give them.

   Written to be honest about a two-person operation: no audit
   rights we cannot honour, no SLA we do not offer, and a plain
   statement that end-to-end encryption means we never hold the
   message content in the first place.
   ════════════════════════════════════════════════════════════════ */

export default function Dpa() {
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker">Legal</p>
          <h1 className="page-hero__title">Data Processing Agreement</h1>
          <p className="page-hero__sub">
            For Secretly Teams · Article 28 GDPR · Version 1.2, 26 September 2026
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div className="prose">

          <h2>Before the clauses: what we actually hold</h2>
          <p>
            Most of a data processing agreement describes what a provider does
            with your data. Ours is unusual, and it is worth saying plainly
            before the formal wording starts.
          </p>
          <p>
            <strong>We cannot read your organisation&rsquo;s messages, files or
            one-to-one calls.</strong> They are encrypted on the sender&rsquo;s device and
            decrypted on the recipient&rsquo;s. Our servers pass ciphertext they
            have no key for. This is not a policy we could quietly change: it is
            how the protocol works, and the source code is public so you can
            check rather than believe us. Group calls are the exception: they
            pass through our self-hosted media server encrypted in transit, not
            end-to-end.
          </p>
          <p>
            What we do process is the minimum needed to deliver a message to the
            right device: account identifiers, device public keys, push tokens,
            timestamps and sizes, plus display names and group titles, which are
            shown as notification titles. That is the subject of this agreement.
          </p>
          <p>
            <strong>Change in version 1.2.</strong> This version states that server
            backups are currently stored unencrypted on the same server, how long they
            are really kept, and that backups made before 24 September 2026 may still
            contain notification previews until they are deleted. It also calls our
            handshake X3DH-like and limits Apple push to iOS devices.
          </p>
          <p>
            <strong>Change in version 1.1.</strong> Until 24 September 2026 the
            app also sent up to 180 characters of message text for notification
            previews; the server stored it and included it in the push sent
            through Apple or Google. Since that date the server discards it and
            app version 1.8.59 no longer sends it. Previews that were queued were removed on that date;
            server backups made before it may still contain them until those
            backups are deleted.
          </p>

          <h2>1. Parties and roles</h2>
          <p>
            This agreement is between the customer organisation
            (the &ldquo;<strong>Controller</strong>&rdquo;) and{' '}
            <strong>SIA Secretly</strong>, registration number 40203722244,
            Pāvila Rozīša iela 1&ndash;13, Valmiera, LV-4201, Latvia
            (the &ldquo;<strong>Processor</strong>&rdquo;).
          </p>
          <p>
            It forms part of, and is subject to, our{' '}
            <Link to="/terms-of-service">Terms of Service</Link>. Where this
            agreement and the Terms conflict on the processing of personal data,
            this agreement prevails.
          </p>

          <h2>2. Subject matter, duration, nature and purpose</h2>
          <ul>
            <li>
              <strong>Subject matter:</strong> providing the Secretly messaging
              service to the Controller&rsquo;s members.
            </li>
            <li>
              <strong>Duration:</strong> for as long as the Controller&rsquo;s
              subscription is active, plus the deletion periods in section 9.
            </li>
            <li>
              <strong>Nature and purpose:</strong> routing end-to-end encrypted
              messages between devices, delivering push notifications, storing
              encrypted backups the user chooses to make, and administering seats.
            </li>
            <li>
              <strong>Controller&rsquo;s instructions:</strong> this agreement and
              the Terms are the documented instructions. Any further instruction
              must be in writing; if we believe one breaches the GDPR, we will
              say so before acting.
            </li>
          </ul>

          <h2>3. Categories of data subjects and personal data</h2>
          <p><strong>Data subjects:</strong> the Controller&rsquo;s members who use Secretly, and the people they communicate with.</p>
          <p><strong>Personal data processed:</strong></p>
          <ul>
            <li>Secretly ID (a device-generated identifier — no phone number, no email address)</li>
            <li>Display name and avatar, if the user chooses to set them; group titles. Display names and group titles are used as notification titles</li>
            <li>Device public keys and prekey bundles</li>
            <li>Push notification tokens (Apple, Google)</li>
            <li>Delivery metadata: conversation identifiers, timestamps, message sizes, delivery and read status</li>
            <li>Group-call audio and video, relayed in transit by our media server (not end-to-end encrypted)</li>
            <li>Until 24 September 2026 only: up to 180 characters of message text for notification previews — no longer collected; server backups made before that date may still contain it until they are deleted</li>
            <li>Encrypted backup archives, where the user creates one — encrypted with a password we do not hold</li>
            <li>IP addresses in transient connection and security logs</li>
            <li>Billing references for the organisation&rsquo;s seats</li>
          </ul>
          <p>
            <strong>Not processed:</strong> message, file or one-to-one call
            content, which is end-to-end encrypted (subject to the group-call and
            preview notes above); contact lists, which stay on the device; and
            any special category data under Article 9 — which does not mean your
            members cannot discuss it, only that we never see it.
          </p>

          <h2>4. Processor obligations</h2>
          <p>We:</p>
          <ul>
            <li>process personal data only on the Controller&rsquo;s documented instructions, including on transfers, unless required otherwise by EU or Member State law — in which case we inform the Controller first, unless that law forbids it;</li>
            <li>ensure everyone authorised to process the data is bound by confidentiality;</li>
            <li>take the technical and organisational measures required by Article 32 (section 6);</li>
            <li>engage sub-processors only under section 5;</li>
            <li>assist the Controller, by appropriate measures, in responding to data subject requests under Chapter III;</li>
            <li>assist the Controller with Articles 32 to 36 — security, breach notification, impact assessments and prior consultation — taking into account what we know and what is available to us;</li>
            <li>delete or return the data at the end of the service, as set out in section 9;</li>
            <li>make available the information needed to demonstrate compliance, and allow the audits described in section 10.</li>
          </ul>

          <h2>5. Sub-processors</h2>
          <p>
            The Controller gives general authorisation for the sub-processors
            listed below. We will give at least <strong>30 days&rsquo; notice</strong>{' '}
            by email before adding or replacing one. If the Controller objects on
            reasonable data protection grounds within that period, and we cannot
            resolve the objection, the Controller may terminate the affected
            subscription and receive a pro-rata refund of the unused term.
          </p>
          <ul>
            <li><strong>Hetzner Online GmbH</strong> (Germany, EU) — hosting of the relay and key servers. All persistent data lives here.</li>
            <li><strong>Apple Inc.</strong> (USA) — push notification delivery to iOS devices. Receives a push token, a wake signal and the notification title (sender&rsquo;s display name or group title) — no message text since 24 September 2026.</li>
            <li><strong>Google Ireland Ltd / Google LLC</strong> (Ireland, USA) — Firebase Cloud Messaging for Android push. Same: token, wake signal and notification title only.</li>
            <li><strong>Cloudflare, Inc.</strong> (USA) — serves the public website only. No messaging traffic passes through it.</li>
          </ul>
          <p>
            <strong>Giphy</strong> receives whatever a user types into the GIF
            search box, and the device&rsquo;s IP address, if they use that
            feature. This is the user&rsquo;s own
            action rather than processing on the Controller&rsquo;s behalf, and
            the feature can be left unused; we list it here so nobody is
            surprised.
          </p>
          <p>
            We remain fully liable to the Controller for a sub-processor&rsquo;s
            performance of its data protection obligations.
          </p>

          <h2>6. Security measures</h2>
          <p>Article 32 measures in force:</p>
          <ul>
            <li>end-to-end encryption of message content using the Double Ratchet protocol with an X3DH-like key agreement and Ed25519 identities (the initiator signs the handshake since app version 1.8.58) — the server holds no key that decrypts it;</li>
            <li>XChaCha20-Poly1305 for messages and media; AES-256-GCM for backups and the recovery kit; SQLCipher for storage on the device; DTLS-SRTP end-to-end for one-to-one calls, and transport encryption for group calls;</li>
            <li>TLS for every connection between client and server;</li>
            <li>signed server configuration, which the client refuses if the signature does not verify;</li>
            <li>server access restricted to the operator, over key-based SSH;</li>
            <li>access-controlled backups of server state, held in the EU — currently unencrypted and on the same server; encryption and an off-site copy are being added;</li>
            <li>rate limiting, request nonce replay protection and a bounded timestamp window on the key server;</li>
            <li>a published threat model that states the known limitations rather than hiding them.</li>
          </ul>
          <p>
            The measures are described in detail, with pointers into the source
            code, in our{' '}
            <a href="https://github.com/Arkhanhel/Secretly/blob/main/docs/THREAT_MODEL.md"
              target="_blank" rel="noopener noreferrer">threat model</a>. Read
            section 5 of it before signing: it lists what we know is imperfect,
            including what we have not yet reviewed ourselves.
          </p>

          <h2>7. Personal data breaches</h2>
          <p>
            We notify the Controller <strong>without undue delay and in any case
            within 48 hours</strong> of becoming aware of a personal data breach
            affecting their data, by email to the address on the account. The
            notification describes the nature of the breach, the categories and
            approximate number of data subjects and records, the likely
            consequences, and the measures taken or proposed.
          </p>
          <p>
            Where we cannot provide all of it at once, we send what we have and
            follow up without further delay. Notifying the supervisory authority
            and the data subjects remains the Controller&rsquo;s obligation; we
            assist with the information we hold.
          </p>

          <h2>8. International transfers</h2>
          <p>
            All persistent data is stored in Germany. We do not replicate user
            data outside the EU.
          </p>
          <p>
            Push notification tokens necessarily reach Apple and Google, which
            operate infrastructure in the United States. Those transfers rely on
            the European Commission&rsquo;s Standard Contractual Clauses and, where
            the recipient is certified, the EU&ndash;US Data Privacy Framework. A
            push token identifies a device to its own operating system vendor.
            Since 24 September 2026 the push itself carries no message text —
            only a wake signal and the notification title.
          </p>

          <h2>9. Deletion and return</h2>
          <ul>
            <li>A member&rsquo;s account data is deleted when they delete the account in the app, or on request, by us, when the Controller asks us to remove their seat and delete their data.</li>
            <li>On termination of the subscription, we delete the Controller&rsquo;s organisational data within <strong>30 days</strong>, unless EU or Member State law requires us to keep it.</li>
            <li>Server database backups contain routing metadata and encrypted payloads, not readable message content, and are usually kept for <strong>14 days</strong>; the three most recent copies are always kept, whatever their age. Data in them is not restored to live systems after deletion.</li>
            <li>There is nothing to &ldquo;return&rdquo; in the usual sense: message content lives on the members&rsquo; devices.</li>
          </ul>

          <h2>10. Audits</h2>
          <p>
            We will answer a written data protection questionnaire once per year,
            and provide our threat model, security policy and sub-processor list
            on request. Because the entire client and server source code is
            public, a technical audit does not depend on our cooperation: your
            own security team, or an auditor you hire, can read the code we
            publish. Builds are not yet reproducible, so no one can yet prove
            that a given binary, or our server, was built from it.
          </p>
          <p>
            <strong>We will not pretend to offer more than we can.</strong> An
            on-site inspection of a two-person operation is not a meaningful
            control, and we would rather say so than agree to a clause we cannot
            honour. Where a supervisory authority requires an inspection, we will
            cooperate with it.
          </p>

          <h2>11. Liability</h2>
          <p>
            Each party is liable under Article 82 GDPR. Between the parties,
            liability under this agreement is subject to the limitations in
            section 17 of the Terms of Service, except where those limitations
            cannot lawfully apply — including liability towards data subjects,
            which the GDPR allocates directly.
          </p>

          <h2>12. Term, law and contact</h2>
          <p>
            This agreement takes effect when the Controller&rsquo;s subscription
            begins and lasts as long as we process personal data on their behalf.
            It is governed by the law of the Republic of Latvia; disputes go to
            the courts of Latvia.
          </p>
          <p>
            To sign a countersigned copy, to ask about a sub-processor, or to
            raise anything in this document, write to{' '}
            <a href="mailto:legal@secretlyapp.com">legal@secretlyapp.com</a>. We
            have no data protection officer: our processing does not meet the
            Article 37 thresholds. If that changes, this page changes with it.
          </p>

          <h2>13. A note on what this document is</h2>
          <p>
            This agreement was drafted carefully and without a lawyer&rsquo;s
            review, by a very small team. If your counsel needs wording changed
            to sign it, ask — we would rather adjust the text than have you agree
            to something you are unsure about. Related reading:{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>,{' '}
            <Link to="/terms-of-service">Terms of Service</Link>,{' '}
            <Link to="/verify">how to verify a build</Link>.
          </p>

          </div>
        </div>
      </section>
    </div>
  )
}
