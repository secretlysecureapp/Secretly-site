import { useReveal } from '../hooks/useReveal'

/* ════════════════════════════════════════════════════════════════
   /verify — how to check a Secretly build, and what cannot be
   checked yet.

   Deliberately English-only: this page is read by auditors,
   reviewers and developers, and every value on it is a literal
   command, hash or flag. Running it through ten translation
   dictionaries would add ten ways for a checksum to go stale
   without adding a single reader.

   The authoritative copy of these numbers lives in the source
   repository (docs/VERIFY.md), where it is versioned and reviewable.
   This page summarises it and links there — when a release ships,
   only the repository file needs updating.
   ════════════════════════════════════════════════════════════════ */

const REPO = 'https://github.com/Arkhanhel/Secretly'
const VERIFY_MD = `${REPO}/blob/main/docs/VERIFY.md`
const BUILD_MD = `${REPO}/blob/main/docs/BUILD.md`
const THREAT_MD = `${REPO}/blob/main/docs/THREAT_MODEL.md`

const DEFINES = [
  'SECRETLY_KEYS_BASE_URL=https://keys.secretlyapp.com',
  'SECRETLY_RELAY_HTTP_BASE_URL=https://relay.secretlyapp.com',
  'SECRETLY_RELAY_WS_URL=wss://relay.secretlyapp.com/ws',
  'SECRETLY_CONFIG_PUBLIC_KEY_B64=hMHcn5pjtUYmlbZziWlPWNxJJKOE7WlNadebVxF+cdk=',
]

const ARTEFACTS = [
  {
    release: '1.8.61 (630)',
    platform: 'macOS',
    file: 'Secretly-1.8.61-630.dmg',
    date: '2026-09-25',
    sha: 'bc21172346b41af4d6ba4c199f47357dda297b711ce9fc0132504ca7fbaaf26d',
  },
  {
    release: '1.8.61 (631)',
    platform: 'Windows',
    file: 'Secretly-1.8.61-631-windows-x64.zip',
    date: '2026-09-26',
    sha: '5e29c8936dde8f04e4b3444407f0907a84b2baf6793f99f89c2c957c35fc4347',
  },
  {
    release: '1.8.61 (630)',
    platform: 'Windows',
    file: 'Secretly-1.8.61-630-windows-x64.zip',
    date: '2026-09-25',
    sha: '7465e38bfbc7853750c3ace547adeaf8e0a82f0f4e84fbbd634ee9e73bf4a2e4',
  },
  {
    release: '1.8.61 (631)',
    platform: 'Android',
    file: 'secretly-production-1.8.61-631-store631.aab',
    date: '2026-09-26',
    sha: 'ad87f9c8e649d7c51b69505ab943b390ac1fb31b73cfe624f0ca45bcc466e7ec',
  },
  {
    release: '1.8.61 (630)',
    platform: 'iOS',
    file: 'secretly-production-1.8.61-630-store630.ipa',
    date: '2026-09-26',
    sha: '50ad5814edc362c848bd907645719d40ebb7e9d45b823e7afc28ccbc039ffbea',
  },
  {
    release: '1.8.59 (628)',
    platform: 'macOS',
    file: 'Secretly-1.8.59-628.dmg',
    date: '2026-09-24',
    sha: 'f581ce72ad4d1f98b6e8b36f043c7feecee6458082b2639387e042e45185b617',
  },
  {
    release: '1.8.59 (628)',
    platform: 'Windows',
    file: 'Secretly-1.8.59-628-windows-x64.zip',
    date: '2026-09-24',
    sha: 'e6305516dedc57082b31904b64605265fef549d2dd23f067f5c3fb0005315c90',
  },
  {
    release: '1.8.39 (588)',
    platform: 'Android',
    file: 'secretly-production-1.8.39-588-store588.aab',
    date: '2026-09-05',
    sha: '0441577c7ee0161acfcba4d4c40d90b5eedbf96395a7f05c8de0eff8dd57e31a',
  },
  {
    release: '1.8.39 (588)',
    platform: 'iOS',
    file: 'secretly-production-1.8.39-588-store588.ipa',
    date: '2026-09-05',
    sha: '049d83a97a81090d5b983f4e45a2884bfaf91b875e4eea8bd96de412de146f15',
  },
]

const mono: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.82rem',
  wordBreak: 'break-all',
}

/* A long --dart-define line must not push the page sideways on a phone:
   wrap it instead of letting it overflow the viewport. */
const preBlock: React.CSSProperties = {
  ...mono,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  maxWidth: '100%',
  overflowX: 'auto',
}

export default function Verify() {
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">Verification</p>
          <h1 className="page-hero__title reveal reveal-delay-1">
            Check our claims yourself
          </h1>
          <p className="page-hero__sub reveal reveal-delay-2">
            This page exists so that what we say about Secretly can be checked by
            someone who does not trust us. It is also honest about what cannot be
            checked yet — a verification page that overstates what it proves is
            worse than no page at all.
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <h2 className="reveal">Rebuild the client from source</h2>
          <p className="reveal">
            Almost everything needed to produce a build equivalent to the one in
            the stores is public: the source, the pinned toolchains, and the
            compile-time values below. The one exception is our GIPHY API key.
          </p>

          <ul className="reveal">
            <li>
              Source — <a href={REPO}>{REPO.replace('https://', '')}</a>
            </li>
            <li>Flutter <code>3.41.7</code>, pinned in <code>.flutter-version</code></li>
            <li>Rust <code>1.93.1</code>, pinned in <code>rust-toolchain.toml</code></li>
            <li>
              Dependency versions frozen in <code>pubspec.lock</code> and{' '}
              <code>Cargo.lock</code>
            </li>
          </ul>

          <p className="reveal">
            The store builds were compiled with these four values — all public by
            nature; the last is the <strong>public</strong> half of the key that
            signs our configuration endpoint — plus build settings that do not
            touch the security path: version and build number, a build marker,
            fallback addresses of our own hosts, and feature switches (room keys,
            call logs, demo data, pre-key handling). One value is private: our
            GIPHY API key, so a rebuild will differ from ours at least in that
            string.
          </p>
          <pre className="reveal" style={preBlock}>
            {DEFINES.map((d) => `--dart-define=${d}`).join('\n')}
          </pre>

          <p className="reveal">
            Step-by-step instructions are in <a href={BUILD_MD}>docs/BUILD.md</a>.
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <h2 className="reveal">What we published</h2>
          <p className="reveal">
            SHA-256 of the exact desktop files we offer for download, and of the
            exact mobile files we handed to Apple and Google.
          </p>

          <div className="reveal" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px 8px 0' }}>Release</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px 8px 0' }}>Platform</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px 8px 0' }}>Published</th>
                  <th style={{ textAlign: 'left', padding: '8px 0' }}>SHA-256</th>
                </tr>
              </thead>
              <tbody>
                {ARTEFACTS.map((a) => (
                  <tr key={a.file}>
                    <td style={{ padding: '8px 12px 8px 0' }}>{a.release}</td>
                    <td style={{ padding: '8px 12px 8px 0' }}>{a.platform}</td>
                    <td style={{ padding: '8px 12px 8px 0', whiteSpace: 'nowrap' }}>{a.date}</td>
                    <td style={{ padding: '8px 0', ...mono }}>{a.sha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="reveal" style={{ fontSize: '0.9rem', marginTop: 12 }}>
            Each release&rsquo;s exact source is tagged in the repository
            (for example <code>v1.8.61-630</code>); <a href={VERIFY_MD}>docs/VERIFY.md</a>{' '}
            maps every file to its tag. On 26 September 2026 Google Play serves
            1.8.61 (631); the App Store still serves 1.8.39 (588), with 1.8.61
            (630) in TestFlight.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Desktop downloads: compare them directly
          </h3>
          <p className="reveal">
            The macOS and Windows apps come straight from us, not from a store, so
            the file you download is byte-for-byte the file listed above for that
            version. Compute its SHA-256 — <code>shasum -a 256</code> on macOS,{' '}
            <code>certutil -hashfile &lt;file&gt; SHA256</code> on Windows — and
            compare. A match proves you received exactly the file we published. It
            does not yet prove that file was built from our source: builds are not
            reproducible yet.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Store builds: read this before comparing them with what you installed
          </h3>
          <p className="reveal">
            For Android and iOS you will not get a match, and that is not a sign of
            tampering.
          </p>
          <ul className="reveal">
            <li>
              <strong>Google Play does not distribute our file.</strong> An App
              Bundle is split by Google into per-device APKs and re-signed with
              Google&rsquo;s key. What lands on your phone has a different hash by
              design.
            </li>
            <li>
              <strong>Apple re-signs and re-packages the IPA</strong> during
              distribution and encrypts the main binary per account. A byte
              comparison is not possible at all.
            </li>
          </ul>
          <p className="reveal">
            So the mobile sums prove one narrow thing: the file we uploaded on that
            date is the file whose hash is printed here, and we have not quietly
            swapped it since. They do not prove that your installed copy came
            from our source. Nobody who ships through those stores can prove
            that, and projects publishing store checksums without saying so are
            describing a check that does not work.
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <h2 className="reveal">What is missing</h2>
          <p className="reveal">
            <strong>
              A directly downloadable, signed APK with a published checksum.
            </strong>{' '}
            That is what would do for Android what the desktop downloads already
            do: you download it from us, compute its SHA-256, compare, and check
            the signing certificate fingerprint — with no store in the middle. It
            does not exist yet.
          </p>
          <p className="reveal">
            Until it does, the honest summary is: you can rebuild our client from
            source and inspect what it does; you can byte-compare a desktop
            download with its published checksum; you cannot byte-compare the copy
            you installed from a store. The order of work, and where reproducible
            builds stand, is in <a href={VERIFY_MD}>docs/VERIFY.md</a>.
          </p>

          <h2 className="reveal" style={{ marginTop: 40 }}>
            If something does not match
          </h2>
          <p className="reveal">
            If you rebuild from source and find behaviour that contradicts{' '}
            <a href={THREAT_MD}>our threat model</a> or anything on this page,
            that is a finding and we want it. Write to{' '}
            <a href="mailto:security@secretlyapp.com">
              security@secretlyapp.com
            </a>. We publish corrections,
            including the ones that embarrass us.
          </p>
        </div>
      </section>
    </div>
  )
}
