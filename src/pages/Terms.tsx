import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

export default function Terms() {
  const ref = useReveal()
  const { t } = useTranslation()

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker">Legal</p>
          <h1 className="page-hero__title">Terms of Service</h1>
          <p className="page-hero__sub">
            Effective date: July 01, 2026 · Operator: SIA Secretly
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div className="prose">
            <div style={{
              padding: '20px 24px',
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-border)',
              borderRadius: 'var(--r-md)',
              marginBottom: 40,
            }}>
              <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: '1.05rem', color: 'var(--accent)' }}>
                {t('termsAbuse.title')}
              </h3>
              <p style={{ marginBottom: 0 }}>{t('termsAbuse.body')}</p>
            </div>

            <h2>1. Acceptance</h2>
            <p>These Terms of Service govern your access to and use of Secretly.</p>
            <p>
              By installing, accessing, or using Secretly, you agree to these Terms and the Privacy
              Policy. If you do not agree, do not use Secretly.
            </p>
            <p>
              If you use Secretly on behalf of an organization, you represent that you have the
              authority to bind that organization.
            </p>

            <h2>2. The Service</h2>
            <p>Secretly provides a private messaging service, including:</p>
            <ul>
              <li>Encrypted message delivery</li>
              <li>Contacts and profiles</li>
              <li>Rooms and group communication</li>
              <li>Audio and video calls</li>
              <li>Notifications</li>
              <li>Backups and recovery</li>
              <li>Device linking</li>
              <li>Account deletion tools</li>
              <li>On-device message translation and voice-message transcription</li>
              <li>
                Voice dictation (by default, sends the audio you dictate to your device's
                operating-system speech-recognition service — Apple's or Google's — for conversion
                to text; an offline, fully on-device transcription mode is available as an
                alternative where supported)
              </li>
              <li>GIF search (powered by Giphy)</li>
            </ul>
            <p>Secretly is designed so that:</p>
            <ul>
              <li>Messages are encrypted on your device before transmission</li>
              <li>Servers are designed to relay encrypted payloads</li>
              <li>Servers do not access message plaintext in normal operation</li>
            </ul>
            <p>Secretly may change, suspend, limit, or discontinue features at any time for:</p>
            <ul>
              <li>Security</li>
              <li>Maintenance</li>
              <li>Legal requirements</li>
              <li>Operational reasons</li>
              <li>Abuse prevention</li>
            </ul>

            <h2>3. Eligibility</h2>
            <p>You must:</p>
            <ul>
              <li>Be at least 13 years old, or the minimum age required by local law</li>
              <li>Have permission from a parent or guardian if required</li>
            </ul>
            <p>You may not use Secretly if:</p>
            <ul>
              <li>You are legally prohibited from using the service</li>
              <li>Sanctions apply to you</li>
              <li>Your account was previously terminated for serious violations</li>
            </ul>

            <h2>4. Your Account, Devices, and Recovery</h2>
            <p>Secretly accounts are based on <strong>cryptographic profiles and device keys</strong>.</p>
            <p>You are responsible for:</p>
            <ul>
              <li>Keeping your devices secure</li>
              <li>Protecting passcodes, biometrics, and recovery credentials</li>
              <li>Maintaining access to backups and devices</li>
              <li>Reviewing verification tools (QR codes, safety indicators)</li>
              <li>Understanding that loss of keys or credentials may result in permanent data loss</li>
            </ul>
            <p>You must not:</p>
            <ul>
              <li>Register devices you do not control</li>
              <li>Use other people's keys or tokens</li>
              <li>Access accounts or profiles without authorization</li>
            </ul>

            <h2>5. User Content</h2>
            <p>You are responsible for all content you create or share, including:</p>
            <ul>
              <li>Messages</li>
              <li>Media and files</li>
              <li>Profile information</li>
              <li>Room content</li>
              <li>Calls</li>
            </ul>
            <p>You confirm that:</p>
            <ul>
              <li>You have the right to share this content</li>
              <li>Your use complies with applicable laws</li>
            </ul>
            <p>Secretly:</p>
            <ul>
              <li>Does not claim ownership of your content</li>
              <li>Processes content only to operate the service</li>
              <li>Handles encrypted payloads and metadata</li>
            </ul>
            <p>Because Secretly uses encryption:</p>
            <ul>
              <li>We may be unable to access the message content</li>
              <li>We may be unable to proactively moderate communications</li>
            </ul>
            <p>We may act based on:</p>
            <ul>
              <li>Metadata</li>
              <li>User reports</li>
              <li>Public profile data</li>
              <li>Abuse signals</li>
              <li>Legal requests</li>
            </ul>

            <h2>6. Acceptable Use</h2>
            <p>You must comply with all applicable laws.</p>
            <p>You must not use Secretly to:</p>
            <ul>
              <li>Violate laws or regulations</li>
              <li>Harm, harass, or exploit others</li>
              <li>Share or facilitate abuse of minors</li>
              <li>Promote violence or terrorism</li>
              <li>Distribute malware, scams, or phishing</li>
              <li>Infringe intellectual property or privacy rights</li>
              <li>Bypass security systems or enforcement</li>
              <li>Disrupt or interfere with the service</li>
              <li>Use Secretly for emergency or life-critical communication</li>
            </ul>
            <p>We may:</p>
            <ul>
              <li>Investigate misuse</li>
              <li>Restrict or suspend accounts</li>
              <li>Remove content</li>
              <li>Report activity when required</li>
            </ul>

            <h2>7. Blocking, Reporting, and Safety</h2>
            <p>Secretly includes blocking features that may work:</p>
            <ul>
              <li>Locally on your device</li>
              <li>At the service level</li>
            </ul>
            <p>To report abuse:</p>
            <p><strong>technical.support@secretlyapp.com</strong></p>
            <p>You may include:</p>
            <ul>
              <li>Profile ID</li>
              <li>Timestamps</li>
              <li>Evidence (if legally allowed)</li>
            </ul>
            <p>Do not include:</p>
            <ul>
              <li>Passwords</li>
              <li>Private keys</li>
              <li>Recovery credentials</li>
            </ul>
            <p>Because of encryption:</p>
            <ul>
              <li>We may not be able to review message content</li>
              <li>Actions may depend on available metadata and evidence</li>
            </ul>

            <h2>8. Notifications, Calls, and Availability</h2>
            <p>Delivery depends on:</p>
            <ul>
              <li>Device state</li>
              <li>Network conditions</li>
              <li>Operating systems</li>
              <li>Third-party infrastructure</li>
            </ul>
            <p>As a result:</p>
            <ul>
              <li>Messages may be delayed or fail</li>
              <li>Calls may not connect</li>
              <li>Notifications may not arrive</li>
            </ul>
            <p>
              Calls use <strong>secure transport encryption</strong>. Encryption level may depend
              on configuration and infrastructure.
            </p>
            <p>Secretly is <strong>not an emergency service</strong>.</p>

            <h2>9. Backups and Recovery</h2>
            <p>Secretly may provide encrypted backups.</p>
            <ul>
              <li>Backups are encrypted client-side</li>
              <li>You are responsible for recovery credentials</li>
            </ul>
            <p>If you lose access:</p>
            <ul>
              <li>Data may not be recoverable</li>
              <li>Secretly may be unable to decrypt your data</li>
            </ul>

            <h2>10. Subscriptions, Purchases, and Donations</h2>
            <p>
              Secretly is free to use. Optional paid plans (Premium and Teams) may be offered as
              in-app purchases or subscriptions.
            </p>
            <ul>
              <li>In-app subscriptions are sold and billed through the Apple App Store or Google Play under their terms.</li>
              <li>Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period; you can manage or cancel them in your App Store or Google Play account settings.</li>
              <li>Where a free trial is offered with a subscription plan (for example, a trial period preceding an annual Premium subscription), the trial duration and the fact that it automatically converts into a paid subscription at the then-current price unless cancelled before the trial ends are clearly stated in the app and in the App Store / Google Play listing before you confirm purchase; you can cancel during the trial at no charge via your App Store or Google Play account settings.</li>
              <li>A lifetime option, where offered, is a one-time purchase.</li>
              <li>Refunds are handled according to the policy of the app store used for the purchase: <a href="https://support.apple.com/en-us/HT204084" target="_blank" rel="noopener noreferrer">Apple</a>, <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener noreferrer">Google Play</a>.</li>
              <li>
                <strong>Right of withdrawal.</strong> Every paid plan is bought from
                the store, not from us: Apple and Google are the sellers of record
                for those transactions, so the statutory 14-day right of withdrawal
                for EU and EEA consumers, and its exceptions for digital content
                whose delivery has begun, are handled under their terms and through
                their refund process. We do not currently sell subscriptions
                directly. Should we ever do so, the 14-day right would apply to that
                purchase and the withdrawal form would be published here.
              </li>
              <li>The agreement for the Secretly <em>service</em> — the accounts, servers and support behind the app — is between you and SIA Secretly.</li>
              <li>The name, duration, price, and contents of each paid plan are shown to you in the app and in the App Store / Google Play listing before you confirm; payment is charged to your store account upon confirmation, and the price of a renewal is the then-current price for that plan.</li>
            </ul>
            <p>
              Donations may be collected via third-party providers; those payments are processed
              externally and Secretly does not store card data. Pricing and availability of paid
              features may change.
            </p>

            <h2>11. Third-Party Services</h2>
            <p>Secretly relies on third-party services, including:</p>
            <ul>
              <li>Operating systems</li>
              <li>App stores</li>
              <li>Push providers</li>
              <li>Hosting infrastructure</li>
              <li>Media providers</li>
              <li>GIF search (Giphy) — if you use the GIF search feature, the text you type into the GIF search box is sent to Giphy to retrieve matching results</li>
            </ul>
            <p>These services operate under their own terms.</p>
            <p>Secretly is not responsible for services outside its control.</p>

            <h2>12. App Stores</h2>
            <p>If downloaded via an app store:</p>
            <ul>
              <li>The store provider is not responsible for the app</li>
            </ul>
            <p>For applications obtained through the Apple App Store, you agree:</p>
            <ul>
              <li>This agreement is between you and SIA Secretly only, not Apple; Apple is not responsible for the application or its content.</li>
              <li>Apple has no obligation to provide maintenance or support for the application.</li>
              <li>Apple is not responsible for any product warranties, whether express or implied; any warranty claim and the cost of fulfilling it are SIA Secretly’s responsibility.</li>
              <li>SIA Secretly, not Apple, is responsible for addressing any claims relating to the application or your use of it (including product-liability, legal/regulatory, and intellectual-property claims).</li>
              <li>You represent that you are not located in a country subject to a U.S. Government embargo or designated “terrorist-supporting,” and are not on any U.S. Government prohibited-or-restricted-parties list.</li>
              <li>Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.</li>
            </ul>

            <h2>13. Updates and Beta Features</h2>
            <p>Secretly may include:</p>
            <ul>
              <li>Experimental features</li>
              <li>Beta functionality</li>
            </ul>
            <p>These may:</p>
            <ul>
              <li>Change</li>
              <li>Break</li>
              <li>Be removed</li>
            </ul>
            <p>Updates may be required to continue using the service.</p>

            <h2>14. Intellectual Property and Open Source</h2>
            <p>
              The Secretly client and server source code is free software,
              published under the <strong>GNU Affero General Public License,
              version 3</strong>, with an additional permission that allows
              distribution through application stores. The licence is granted by
              the copyright holder and is irrevocable on its own terms: it lets
              you use, study, modify and redistribute the code, and it is not
              limited by these Terms. Nothing in this section takes away any
              right the AGPL gives you.
            </p>
            <p>
              The source, the licence and its additional permission are at{' '}
              <a href="https://github.com/Arkhanhel/Secretly" target="_blank" rel="noopener noreferrer">
                github.com/Arkhanhel/Secretly
              </a>. If you run a modified version of our server software as a
              network service, section 13 of the AGPL requires you to offer its
              source to its users; we do the same, which is why this repository
              exists.
            </p>
            <p>
              What these Terms do govern is the <strong>service we operate</strong> —
              the servers at <code>keys.secretlyapp.com</code> and{' '}
              <code>relay.secretlyapp.com</code> — and access to it. For that
              service you receive a limited, non-exclusive, non-transferable and
              revocable right of access, for lawful purposes only. A fork runs on
              its own infrastructure.
            </p>
            <p>
              The name &ldquo;Secretly&rdquo;, the logo and the application icons
              are trademarks and are <strong>not</strong> covered by the AGPL. Fork
              freely; publish under your own name and icon.
            </p>
            <p>
              This website is a separate work, published under the MIT licence.
            </p>

            <h2>15. Suspension and Termination</h2>
            <p>You may stop using Secretly at any time.</p>
            <p>We may suspend or terminate access if:</p>
            <ul>
              <li>Terms are violated</li>
              <li>Risk or abuse is detected</li>
              <li>Required by law or policy</li>
              <li>Service becomes unavailable</li>
            </ul>
            <p>Termination does not remove data already received by others.</p>

            <h2>16. Disclaimers</h2>
            <p>Secretly is provided:</p>
            <p><strong>"as is" and "as available."</strong></p>
            <p>We do not guarantee:</p>
            <ul>
              <li>Continuous availability</li>
              <li>Error-free operation</li>
              <li>Delivery or recovery of data</li>
            </ul>

            <h2>17. Limitation of Liability</h2>
            <p>
              <strong>Nothing in these Terms limits or excludes our liability for
              death or personal injury caused by our negligence, for fraud or
              fraudulent misrepresentation, for wilful misconduct or gross
              negligence, or for anything else that cannot lawfully be limited or
              excluded.</strong> If you are a consumer, your mandatory statutory
              rights are unaffected by this section.
            </p>
            <p>Subject to that, and to the maximum extent permitted by law:</p>
            <ul>
              <li>we are not liable for indirect or consequential damages,</li>
              <li>including loss of data, service interruptions, or security issues.</li>
            </ul>
            <p>
              Subject to the same reservation, our total liability is limited to the
              greater of the amount you paid us in the twelve months before the claim
              arose, or EUR 100.
            </p>

            <h2>18. Indemnity</h2>
            <p>You agree to indemnify Secretly against claims arising from:</p>
            <ul>
              <li>Your use of the service</li>
              <li>Your content</li>
              <li>Violations of these Terms or laws</li>
            </ul>

            <h2>19. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the law of the <strong>Republic of
              Latvia</strong>, where SIA Secretly is established, excluding its
              conflict-of-laws rules. Disputes are subject to the courts of the
              Republic of Latvia.
            </p>
            <p>
              <strong>If you are a consumer resident in the EU or EEA, this does
              not deprive you of anything.</strong> You keep the protection of the
              mandatory law of your country of residence, and you may bring
              proceedings against us in the courts of that country. We may sue a
              consumer only in the courts of the country where they live.
            </p>
            <p>Before filing a claim, please write to us and allow a reasonable time to resolve it:</p>
            <ul>
              <li>Legal notices and disputes: legal@secretlyapp.com</li>
              <li>Everything else: support@secretlyapp.com</li>
            </ul>
            <p>
              The European Commission also runs an{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                online dispute resolution platform
              </a>. We are not obliged to use an alternative dispute resolution body
              and, at present, we do not.
            </p>

            <h2>20. Changes to Terms</h2>
            <p>We may update these Terms.</p>
            <p>If changes are material:</p>
            <ul>
              <li>We will take reasonable steps to notify users</li>
            </ul>
            <p>Continued use = acceptance.</p>

            <h2>21. Contact</h2>
            <p>For support, privacy, or legal inquiries:</p>
            <p><a href="mailto:support@secretlyapp.com">support@secretlyapp.com</a></p>
            <p>
              SIA Secretly (Reg. No. 40203722244)
              <br />
              Pāvila Rožiša iela 1–13, Valmiera, LV-4201, Latvia
              <br />
              https://www.secretlyapp.com
            </p>
                      <h2>22. Language</h2>
            <p>
              These Terms are published in English, and the English text is the
              only binding version. Parts of this website are available in other
              languages for convenience; a translation of a marketing page does
              not change a term of this agreement. We would rather leave a legal
              text in one language we can keep accurate than publish ten versions
              that quietly drift apart.
            </p>

</div>
        </div>
      </section>
    </div>
  )
}
