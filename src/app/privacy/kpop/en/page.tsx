import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/features/privacy';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Page() {
  const startDate = dayjs('2025-03-05');
  const appName = 'KPOP Clip';
  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <div className="flex gap-md justify-end">
          {[
            { title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_KPOP_KO },
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_KPOP_JP },
            { title: '🇨🇳 简体中文', href: ROUTE_PATH.PRIVACY_KPOP_CN },
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
        <p>Effective date: {startDate.format('MM-DD-YYYY')}</p>
        <p>
          This Privacy Policy is established and disclosed by &lt;&lsquo;{appName}&rsquo;&gt; (URL:{' '}
          <Link
            className="text-app-primary dark:text-app-dark-primary underline"
            href={DEVELOPER.SITE_URL}
          >
            {DEVELOPER.SITE_URL}
          </Link>
          ) in accordance with Article 30 of the Personal Information Protection Act to protect the
          personal information of data subjects and to handle related complaints promptly and
          smoothly.
        </p>

        <PrivacySection title="Article 1 (Purpose of Processing)">
          <p>
            {appName} processes only the minimum personal information for the purposes below. It is
            not used for any other purposes, and if the purpose changes, {appName} will take
            necessary measures such as obtaining separate consent under Article 18 of the Personal
            Information Protection Act.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Content delivery',
                text: 'Provide features to watch YouTube videos of specific artists and to download photos that are publicly available on the internet within the app.',
              },
              {
                title: 'Advertising, analytics, and service quality improvement',
                text: 'Personalized ad delivery, fraud prevention, app usage analytics (GA4), and service quality improvement.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 2 (Items Collected and Collection Methods)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Collected items (required) – Mobile advertising identifier',
                text: 'Android Advertising ID (AAID/ADID) or iOS IDFA',
                children: [
                  {
                    title: 'Ad/analytics usage records',
                    text: 'Ad impressions/clicks, screen views, button taps, and other event logs.',
                  },
                  {
                    title: 'Device and app information',
                    text: 'OS type/version, device model, app version, etc. (may be automatically collected by analytics SDKs).',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    The advertising identifier is a device-specific resettable identifier. Users can
                    reset/delete it or limit personalized advertising in their device settings.
                  </div>
                ),
              },
              {
                title: 'Collection methods',
                children: [
                  {
                    text: 'Collected automatically via mobile SDKs (e.g., Google AdMob, GA4) when the app is installed and used, without any sign-up or login process.',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 3 (Retention and Use Period)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '{appName} does not operate separate servers to store users’ identifying information for long periods. Data used for advertising and analytics follows the retention settings and policies of the respective SDK providers.',
              },
              {
                title: 'GA4 retention',
                text: 'The administrator can select 2 months or 14 months. Google Signals data may be retained for up to 26 months regardless of this setting.',
              },
              {
                title:
                  'When the purpose is achieved or the retention period expires, the data will be promptly destroyed, or if required by law, stored separately.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 4 (Provision to Third Parties)">
          {appName} does not provide personal information to third parties by default. However, it
          may be provided when there is a legal basis or with separate consent from the data
          subject.
        </PrivacySection>

        <PrivacySection title="Article 5 (Outsourcing and Cross-Border Transfers)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: 'For stable service provision, {appName} may outsource parts of personal information processing to external processors. If a processor is located overseas, cross-border transfers may occur. {appName} complies with applicable laws when concluding outsourcing agreements.',
                children: [
                  { title: 'Processor / Recipient', text: 'Google LLC (AdMob, Google Analytics)' },
                  { title: 'Destination country', text: 'United States' },
                  {
                    title: 'Timing and method of transfer',
                    text: 'Real-time transmission over the network whenever the app is used.',
                  },
                  {
                    title: 'Items transferred',
                    text: 'Advertising identifiers (AAID/IDFA), usage records (ad impressions/clicks, event logs, etc.), device/app information (OS, device model, app version, etc.).',
                  },
                  {
                    title: 'Purpose of use',
                    text: 'Ad delivery, statistical analysis, and service quality improvement.',
                  },
                  {
                    title: 'Retention period',
                    text: 'As set out in Article 3 and in each processor’s policy.',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    Note: On Android, users can reset/delete the advertising ID and limit
                    personalized ads in Settings.
                  </div>
                ),
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 6 (Automated Collection Tools: Use and Opt-out)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Cookies',
                text: 'Given the nature of mobile apps, {appName} does not use cookies.',
              },
              {
                title: 'Advertising Identifier (AAID/IDFA)',
                text: 'Used for ad delivery and analytics.',
                children: [
                  {
                    title: 'Android',
                    text: 'Settings &gt; Privacy &gt; Ads &gt; Reset/Delete Advertising ID, and limit personalized ads.',
                  },
                  {
                    text: '(On iOS, you can manage tracking permissions in Settings.) Changing these settings may limit personalized ads or reset/delete the related identifier.',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 7 (Destruction Procedures and Methods)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: 'Data will be destroyed without delay when the reason for destruction arises.',
              },
              {
                title: 'Electronic files',
                text: 'Permanently deleted using irreversible technical methods.',
              },
              { title: 'Printed materials', text: 'Shredded or incinerated.' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 8 (Security Measures)">
          To comply with the “Standards for Ensuring the Security of Personal Information,”{' '}
          {appName}
          implements measures such as:
          <PrivacyList
            items={[
              {
                text: 'Establishing and implementing an internal management plan, access control, keeping and protecting access logs against alteration, encryption (where applicable), anti-malware and security programs, and periodic inspections and training.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 9 (Rights of Data Subjects and How to Exercise Them)">
          <PrivacyList
            items={[
              {
                text: 'Data subjects may at any time exercise the rights to request access, correction, deletion, and suspension of processing. These rights may also be exercised through a representative (with a power of attorney in the prescribed form).',
              },
              {
                text: 'Requests may be submitted in writing, by email, or by fax. {appName} will handle them without undue delay.',
              },
              {
                text: 'Where there are statutory grounds to restrict access or refuse suspension, {appName} will act in accordance with the relevant laws.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 10 (Data Protection Officer & Access Request Contact)">
          <PrivacyList
            items={[
              { title: 'Data Protection Officer', text: 'Taehong Kim (no formal title/position)' },
              {
                title: 'Contact',
                text: (
                  <span>
                    {DEVELOPER.PHONE_NUMBER},{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href={`mailto:${DEVELOPER.EMAIL}`}
                    >
                      {DEVELOPER.EMAIL}
                    </Link>
                  </span>
                ),
              },
              { title: 'Access request contact', text: 'Same as above.' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 11 (Remedies)">
          <PrivacyList
            items={[
              {
                text: 'For counseling or dispute resolution regarding personal information infringements, you may contact the organizations below.',
              },
              {
                title: 'Personal Information Dispute Mediation Committee',
                text: (
                  <span>
                    1833-6972,{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href="https://www.kopico.go.kr"
                    >
                      www.kopico.go.kr
                    </Link>
                  </span>
                ),
              },
              {
                title: 'Personal Information Infringement Report Center (KISA)',
                text: (
                  <span>
                    118,{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href="https://privacy.kisa.or.kr"
                    >
                      privacy.kisa.or.kr
                    </Link>
                  </span>
                ),
              },
              {
                title: 'Supreme Prosecutors’ Office',
                text: (
                  <span>
                    1301,{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href="https://www.spo.go.kr"
                    >
                      www.spo.go.kr
                    </Link>
                  </span>
                ),
              },
              {
                title: 'Korean National Police Agency (Cyber Bureau)',
                text: (
                  <span>
                    182,{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href="https://ecrm.cyber.go.kr"
                    >
                      ecrm.cyber.go.kr
                    </Link>
                  </span>
                ),
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 12 (Integration with External Services)">
          The app provides content through YouTube links/players. Where YouTube or other platforms
          collect and process personal information, their own privacy policies apply. Please refer
          to each provider’s policy for details.
        </PrivacySection>

        <PrivacySection title="Article 13 (Changes to this Privacy Policy)">
          This policy applies from {startDate.format('MM-DD-YYYY')}. If there are changes due to
          laws, service content, or processors, {appName} will notify users of the changes and
          effective date on the website.
        </PrivacySection>
      </div>
    </main>
  );
}
