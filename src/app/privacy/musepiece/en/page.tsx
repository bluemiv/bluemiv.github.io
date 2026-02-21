import dayjs from 'dayjs';
import Link from 'next/link';
import { DEVELOPER, PrivacyList, PrivacySection } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Page() {
  const startDate = dayjs('2026-02-21');
  const companyName = DEVELOPER.COMPANY_NAME;
  const appName = 'MusePiece: Anime Jigsaw';

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <div className="flex gap-md justify-end">
          {[
            { title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_MUSEPIECE_KO },
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_MUSEPIECE_JP },
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
        <p>Effective Date: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          This Privacy Policy is established and disclosed by &lt;{companyName}&gt;, the operator of
          &lt;{appName}&gt; (the &quot;App&quot;), to protect users&apos; personal information and
          handle related requests in accordance with applicable privacy laws.
        </p>

        <PrivacySection title="Article 1 (Purpose of Processing Personal Information)">
          <p>
            The App processes the minimum amount of information only for the following purposes.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Game Feature Operation',
                text: 'Providing puzzle gameplay, gallery unlocks, coins, settings, and app preferences.',
              },
              {
                title: 'Ad Delivery and Free Service Operation',
                text: 'Displaying ads via Google AdMob and processing rewarded ad outcomes.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 2 (Data Items Processed and Collection Method)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Data Stored Locally on Device',
                children: [
                  {
                    text: 'Puzzle progress (clear status, moves/time records, stars, unlock state)',
                  },
                  { text: 'Coins and reward claim state (daily limit/cooldown state)' },
                  { text: 'User settings (language, background music on/off)' },
                ],
              },
              {
                title: 'Automatically Collected by Ad SDK (AdMob)',
                children: [
                  {
                    title: 'Advertising Identifier',
                    text: 'AAID/ADID (Android) or IDFA (iOS)',
                  },
                  { title: 'Ad Event Logs', text: 'Impression, click, reward completion events' },
                  {
                    title: 'Device/App Information',
                    text: 'OS/version, device model, app version and related technical data',
                  },
                ],
              },
              {
                title: 'Collection Method',
                text: 'Automatically collected by the App and Google AdMob SDK during app use.',
              },
              {
                title: 'Items Not Collected by the App',
                text: 'The App does not require account sign-up and does not directly collect personal identifiers such as name, phone number, or precise location.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 3 (Retention and Use Period)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: 'The App does not operate a dedicated backend for user accounts; gameplay/settings data remains on the device.',
              },
              {
                text: 'When the App is uninstalled, locally stored app data is deleted from the device.',
              },
              {
                text: 'Ad-related data collected by AdMob follows Google LLC policies.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 4 (Provision to Third Parties)">
          <p>
            The App does not provide personal information to third parties except where required by
            law or otherwise permitted under applicable regulations.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 5 (Entrustment and International Transfer)">
          <PrivacyList
            items={[
              { title: 'Entrusted Party', text: 'Google LLC (AdMob)' },
              { title: 'Country', text: 'United States' },
              {
                title: 'Transfer Timing/Method',
                text: 'Real-time transfer over network when ad requests are made',
              },
              {
                title: 'Transferred Items',
                text: 'Advertising identifier, ad event logs, device/app information',
              },
              { title: 'Purpose', text: 'Ad delivery and ad performance processing' },
              { title: 'Retention', text: 'According to Google LLC policy' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 6 (User Rights and How to Exercise)">
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: 'Settings > Privacy > Ads > Reset/Delete Advertising ID, Opt out of ad personalization',
              },
              {
                title: 'iOS',
                text: 'Settings > Privacy & Security > Tracking > Turn off app tracking permission',
              },
              {
                text: 'Disabling personalized ads may still allow non-personalized ads.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 7 (Data Deletion)">
          <p>
            Since the App mainly stores data locally, deleting the App removes locally stored game
            data from the device.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 8 (Security Measures)">
          <PrivacyList
            items={[
              {
                text: 'The App applies data minimization, local-first storage, and secure SDK integration practices.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 9 (Privacy Contact)">
          <PrivacyList
            items={[
              { title: 'Data Protection Contact', text: 'TAEHONG KIM' },
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
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 10 (External Services)">
          <PrivacyList
            items={[
              {
                title: 'Google AdMob',
                text: 'Used for banner and rewarded advertisements.',
              },
              {
                title: 'Google Play In-App Review',
                text: 'The App may show the platform review prompt; review submission and related data are handled by the app store provider.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 11 (Changes to this Privacy Policy)">
          <p>
            This Privacy Policy takes effect on {startDate.format('YYYY-MM-DD')}. If this policy is
            updated due to legal or service changes, updates will be announced through this page.
          </p>
        </PrivacySection>
      </div>
    </main>
  );
}
