import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/features/privacy';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Page() {
  const effectiveDate = dayjs('2026-03-01');
  const appName = 'Blim';
  const companyName = DEVELOPER.COMPANY_NAME;

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <div className="flex gap-md justify-end">
          {[
            { title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_BLIM_KO },
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_BLIM_JP },
          ].map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="py-xs px-sm rounded bg-app-sub-bg dark:bg-app-dark-sub-bg text-sm"
            >
              {title}
            </Link>
          ))}
        </div>

        <h1 className="font-semibold text-2xl mb-md">Privacy Policy</h1>
        <p>Effective Date: {effectiveDate.format('YYYY-MM-DD')}</p>
        <p>
          This Privacy Policy explains how {companyName} ("we", "us", "our") processes
          personal data when you use {appName}. We process personal data only as needed to provide, secure, and improve the service.
        </p>
        <p>
          Website:{' '}
          <Link className="text-app-primary dark:text-app-dark-primary underline" href={DEVELOPER.SITE_URL}>
            {DEVELOPER.SITE_URL}
          </Link>
        </p>

        <PrivacySection title="Article 1 (What We Use Data For)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Account and access management',
                text: 'Sign-in, guest linking, account recovery, and abuse prevention.',
              },
              {
                title: 'AI chat service operation',
                text: 'Generating character replies, maintaining conversation context, and syncing chat sessions.',
              },
              {
                title: 'Wallet, purchases, and subscription',
                text: 'Processing Google Play purchases/subscriptions, granting gems, and fraud/idempotency checks.',
              },
              {
                title: 'Ads and rewards',
                text: 'Serving ads (AdMob), applying reward limits, and measuring ad events.',
              },
              {
                title: 'Safety and support',
                text: 'Handling reports/feedback, investigating misuse, and responding to support requests.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 2 (Data We Process)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Account data',
                text: 'Provider user ID, email (if provided by provider), and profile display data.',
              },
              {
                title: 'Service data',
                text: 'Chat messages, chat summaries, character progress (favorites, unlocked cards), and usage metadata.',
              },
              {
                title: 'Payment and subscription data',
                text: 'Google Play product ID, order/purchase token, purchase status, and wallet transaction records.',
              },
              {
                title: 'Technical and security logs',
                text: 'IP address, device/app version, session logs, error logs, and abuse-prevention signals.',
              },
              {
                title: 'Advertising data',
                text: 'Advertising ID (AAID) and ad event data from AdMob SDK.',
              },
              {
                title: 'Support/feedback data (optional)',
                text: 'Message content you submit in in-app support or by email.',
              },
              {
                title: 'We do not intentionally collect',
                text: 'Government-issued IDs, precise GPS location, or contacts/photos from your device.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 3 (How We Collect Data)">
          <PrivacyList
            items={[
              { text: 'From sign-in providers and app marketplaces when you authenticate or purchase.' },
              { text: 'Automatically from your app usage, device environment, and service logs.' },
              { text: 'From integrated processors/SDKs (for example, OpenAI, Supabase, Google Play, AdMob).' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 4 (Retention Period)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Account and service data',
                text: 'Retained while your account is active.',
              },
              {
                title: 'After account deletion',
                text: 'Data may be masked/restricted for up to 30 days for recovery/dispute and fraud handling, then deleted.',
              },
              {
                title: 'Legal retention',
                text: 'Payment and certain records may be retained when required by applicable law (for example, e-commerce/tax obligations).',
              },
              {
                title: 'Security logs',
                text: 'Retained for a limited period needed for security and incident response.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 5 (Third-Party Sharing)">
          <p>
            We do not sell your personal data. We share data only when necessary to operate the service,
            comply with law, protect rights/safety, or with your consent.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 6 (Processors and International Transfers)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Supabase, Inc. (USA)',
                text: 'Backend infrastructure, authentication, database, and storage operation.',
              },
              {
                title: 'OpenAI, Inc. (USA)',
                text: 'AI response generation using chat input/context sent via encrypted API calls.',
              },
              {
                title: 'Google LLC (USA)',
                text: 'Google Play Billing for purchase verification and AdMob for ad delivery/measurement.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 7 (Ads and Device Controls)">
          <PrivacyList
            items={[
              {
                title: 'Android advertising controls',
                text: 'Settings > Privacy > Ads > Reset/Delete Advertising ID or opt out of ad personalization.',
              },
              {
                text: 'Changing these settings may reduce personalized ads, but non-personalized ads may still be shown.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 8 (Your Rights)">
          <PrivacyList
            items={[
              { text: 'You may request access, correction, deletion, and other rights available under applicable law.' },
              {
                text: (
                  <span>
                    You can delete your account in-app or follow the guide at{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href={ROUTE_PATH.ACCOUNT_DELETION_BLIM}
                    >
                      {ROUTE_PATH.ACCOUNT_DELETION_BLIM}
                    </Link>
                    .
                  </span>
                ),
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 9 (Children)">
          <p>
            If we learn an account belongs to a minor, we may suspend/delete related data as required by applicable law and policy.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 10 (Security)">
          <PrivacyList
            items={[
              { text: 'TLS/HTTPS encryption in transit and strict access control for production systems.' },
              { text: 'Server-side secret management and audit logging for security-sensitive operations.' },
              { text: 'Role-based data access controls and monitoring for abnormal behavior.' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 11 (Policy Updates)">
          <p>
            We may update this Policy to reflect legal or service changes. Material changes will be
            announced in-app or on the website before they take effect.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 12 (Contact)">
          <PrivacyList
            items={[
              { title: 'Company', text: companyName },
              {
                title: 'Email',
                text: (
                  <Link
                    className="text-app-primary dark:text-app-dark-primary underline"
                    href={`mailto:${DEVELOPER.EMAIL}`}
                  >
                    {DEVELOPER.EMAIL}
                  </Link>
                ),
              },
            ]}
          />
        </PrivacySection>
      </div>
    </main>
  );
}
