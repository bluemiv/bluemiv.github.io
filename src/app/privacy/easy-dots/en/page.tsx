import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/entities/privacy';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Page() {
  const startDate = dayjs('2026-01-17');
  const appName = 'Easy Dots: Pixel Art Maker';

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <div className="flex gap-md justify-end">
          {[{ title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_EASY_DOTS_KO }].map(
            ({ title, href }) => (
              <Link
                key={title}
                href={href}
                className="py-xs px-sm rounded bg-app-sub-bg dark:bg-app-dark-sub-bg text-sm"
              >
                {title}
              </Link>
            ),
          )}
        </div>
        <h1 className="font-semibold text-2xl mb-md">Privacy Policy</h1>
        <p>Effective Date: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          This Privacy Policy is established and disclosed by &lt;&lsquo;{appName}&rsquo;&gt;
          (hereinafter referred to as the &quot;App&quot;) (Website:{' '}
          <Link
            className="text-app-primary dark:text-app-dark-primary underline"
            href={DEVELOPER.SITE_URL}
          >
            {DEVELOPER.SITE_URL}
          </Link>
          ) to protect the personal information of data subjects and to promptly and smoothly handle
          related complaints in accordance with Article 30 of the Personal Information Protection
          Act.
        </p>

        <PrivacySection title="Article 1 (Purpose of Processing)">
          <p>
            The App processes the minimum amount of personal information for the following purposes.
            It will not be used for purposes other than those specified, and if the purpose of use
            changes, necessary measures such as obtaining separate consent will be taken in
            accordance with Article 18 of the Personal Information Protection Act.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Service Provision',
                text: 'Providing pixel art drawing, templates, loading reference images (processed locally), saving projects on the device, and exporting features.',
              },
              {
                title: 'Providing Advertisements and Maintaining Service Quality',
                text: 'Displaying personalized/standard ads (AdMob) and maintaining free service operation.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 2 (Items Collected and Collection Method)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Items Collected (Required - Ad Related)',
                text: 'Mobile Advertising Identifier (AAID/ADID or iOS IDFA)',
                children: [
                  {
                    title: 'Ad-related Usage Records',
                    text: 'Ad impression/click logs (Collected by AdMob SDK)',
                  },
                  {
                    title: 'Device & App Information',
                    text: 'OS type/version, device model, app version, etc. (Automatically collected by AdMob SDK)',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    The advertising identifier is a resettable identifier per device, and users can
                    reset/delete it or opt-out of personalized ads in the device settings.
                  </div>
                ),
              },
              {
                title: 'Collection Method',
                children: [
                  {
                    text: 'Automatically collected via Google AdMob SDK upon app installation and usage without separate sign-up/login.',
                  },
                ],
              },
              {
                title: 'Items Not Collected',
                text: 'Personally identifiable information such as name, contact, or location is not collected by the App. Images loaded from the gallery or created projects are stored locally on the device and are not transmitted to external servers.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 3 (Retention and Use Period)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: 'The App does not store user identification information on a separate server for long periods. Data for ad operations follows Google LLC (AdMob) retention policies.',
              },
              {
                title:
                  'Upon app deletion, all data stored on the device (projects, settings, etc.) is immediately destroyed.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 4 (Provision to Third Parties)">
          The App does not provide personal information to third parties in principle. However, it
          may be provided if required by law or with separate consent from the data subject.
        </PrivacySection>

        <PrivacySection title="Article 5 (Entrustment and International Transfer)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: 'To provide stable services, some personal information processing tasks are entrusted externally, which may involve international transfer.',
                children: [
                  { title: 'Trustee/Recipient', text: 'Google LLC (AdMob)' },
                  { title: 'Country', text: 'United States' },
                  {
                    title: 'Date/Method',
                    text: 'Real-time transmission via network upon app usage',
                  },
                  {
                    title: 'Items Transferred',
                    text: 'Advertising Identifier (AAID/IDFA), Ad Event Logs (Impression/Click), Device/App Info',
                  },
                  { title: 'Purpose', text: 'Providing and operating advertisements' },
                  { title: 'Retention Period', text: 'According to Google LLC policy' },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 6 (Rights of Data Subjects and How to Exercise)">
          <PrivacyList
            type="ol"
            items={[
              { title: 'Cookies', text: 'The App does not use cookies as it is a mobile app.' },
              {
                title: 'Advertising Identifier (AAID/IDFA)',
                text: 'Used for providing advertisements.',
                children: [
                  {
                    title: 'Android',
                    text: 'Settings > Privacy > Ads > Reset/Delete Advertising ID, Opt out of Ads Personalization',
                  },
                  {
                    title: 'iOS',
                    text: 'Settings > Privacy & Security > Tracking > Allow Apps to Request to Track',
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
                text: 'Since the App does not operate a separate sign-up server, all data stored on the user&apos;s device is immediately destroyed upon app deletion.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 8 (Safety Measures)">
          The App takes the following measures to ensure safety:
          <PrivacyList
            items={[
              {
                text: 'Minimizing personal information collection, applying security settings for Ad SDK, adhering to local-only data processing (no server usage), etc.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 9 (Rights and Obligations of Data Subjects)">
          <PrivacyList
            items={[
              {
                text: 'Data subjects may exercise their rights related to personal information protection at any time. Please contact the Privacy Officer below for inquiries.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 10 (Personal Information Protection Officer and Contact)">
          <PrivacyList
            items={[
              { title: 'Privacy Officer', text: 'TAEHONG KIM' },
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
              { title: 'Inspection Request Dept.', text: 'Same as above' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 11 (Remedies for Rights Infringement)">
          <PrivacyList
            items={[
              {
                text: 'For consultation or dispute resolution regarding personal information infringement, you may contact the privacy protection agencies in your country.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 12 (Linkage with External Services)">
          <p>
            The App uses Google LLC&apos;s AdMob SDK to provide advertisements. If the provider
            collects/processes personal information independently, their privacy policy applies.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 13 (Changes to Privacy Policy)">
          This policy is effective from {startDate.format('YYYY-MM-DD')}. Changes due to laws or
          service updates will be notified via website announcements.
        </PrivacySection>
      </div>
    </main>
  );
}
