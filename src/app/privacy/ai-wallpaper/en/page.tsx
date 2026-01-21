import dayjs from 'dayjs';
import Link from 'next/link';

import { PrivacyList, PrivacySection } from '@/entities/privacy';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Page() {
  const startDate = dayjs('2025-09-22');
  const companyName = 'Berryfy';
  const appName = 'Prisma AI Wallpaper';

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <div className="flex gap-md justify-end">
          {[
            { title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_AI_WALLPAPER_KO },
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_AI_WALLPAPER_JP },
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
          This Privacy Policy is established and disclosed by &lt;{companyName}&gt;, the operator of &lt;{appName}&gt; (hereinafter referred to as the &quot;App&quot;), to protect the personal information of data subjects (hereinafter referred to as &quot;Users&quot;) and to promptly and smoothly handle related complaints in accordance with personal information protection laws.
        </p>

        <PrivacySection title="Article 1 (Purpose of Processing Personal Information)">
          <p>
            {companyName} processes the minimum amount of personal information for the following purposes. The personal information being processed will not be used for purposes other than those stated below, and if the purpose of use changes, necessary measures, such as obtaining separate consent, will be taken.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Providing Core Features',
                text: 'Providing features such as searching for AI-generated wallpapers, adding to favorites (stored on the device), and downloading images.',
              },
              {
                title: 'Providing Advertisements',
                text: 'Displaying personalized ads through Google AdMob and operating the service for free.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 2 (Items of Personal Information Processed and Collection Methods)">
          <p>
            The App does not have a separate membership registration process and does not directly collect personally identifiable information such as names or contact information. The following information may be automatically collected during the process of using the service.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Items Collected',
                children: [
                  {
                    title: 'Advertising Identifier',
                    text: 'Android Advertising ID (AAID) or iOS Identifier for Advertising (IDFA)',
                  },
                  {
                    title: 'Device and App Usage Information',
                    text: 'Non-identifiable information automatically collected by the ad SDK, such as ad impression/click history, device OS version, device model, and app version.',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    The advertising identifier is a non-permanent identifier that users can reset or opt-out of collection from their device settings.
                  </div>
                ),
              },
              {
                title: 'Collection Method',
                text: 'Information is automatically collected through the advertising SDK (Google AdMob) when the user installs and runs the app.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 3 (Period of Retention and Use of Personal Information)">
          <p>
            {companyName} does not store personal information on a separate server. Therefore, when the app is deleted, all data, including favorites, is permanently deleted from the user&apos;s device. Information automatically collected for advertising purposes is processed according to the policy of the entrusted party below.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 4 (Provision of Personal Information to Third Parties)">
          <p>
            {companyName} processes the user&apos;s personal information only within the scope specified in Article 1 (Purpose of Processing Personal Information) and does not provide it to third parties without the user&apos;s consent, except in cases where there are special provisions in the law.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 5 (Entrustment and International Transfer of Personal Information Processing)">
          <p>
            For the smooth provision of services, {companyName} entrusts the processing of personal information to an overseas business operator as follows.
          </p>
          <PrivacyList
            items={[
              {
                title: 'Entrusted Party (Recipient)',
                text: 'Google LLC (AdMob)',
              },
              {
                title: 'Country of Transfer',
                text: 'United States',
              },
              {
                title: 'Date, Time, and Method of Transfer',
                text: 'Transferred in real-time via the network upon ad request from the app',
              },
              {
                title: 'Items of Personal Information to be Transferred',
                text: 'Advertising Identifier (AAID/IDFA), Device and App Usage Information',
              },
              {
                title: 'Details of Entrusted Work (Purpose of Use)',
                text: 'Providing personalized ads and measuring ad performance',
              },
              {
                title: 'Retention and Use Period',
                text: 'In accordance with the privacy policy of the entrusted party',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 6 (Rights and Obligations of the Data Subject and How to Exercise Them)">
          <p>
            The data subject may exercise the following rights regarding the advertising identifier.
          </p>
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: 'Settings > Privacy > Ads > Reset advertising ID or Delete advertising ID, Opt out of Ads Personalization',
              },
              {
                title: 'iOS',
                text: 'Settings > Privacy & Security > Tracking > Turn off "Allow Apps to Request to Track"',
              },
              {
                text: 'Changing the above settings may limit the receipt of personalized ads, but general ads may still be displayed.'
              }
            ]}
          />
        </PrivacySection>

        <PrivacySection title="Article 7 (Destruction of Personal Information)">
          <p>
            {companyName} does not separately store or manage personal information, so it does not perform a destruction procedure. When the user deletes the app, all data is destroyed.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 8 (Measures to Ensure the Security of Personal Information)">
          <p>
            {companyName} takes technical and managerial measures to ensure the security of personal information. However, since we do not directly collect or store personal information, most measures comply with the policies of Google, the ad SDK provider.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 9 (Personal Information Protection Officer)">
          <p>
            {companyName} has designated a personal information protection officer as follows to take overall responsibility for matters concerning the processing of personal information and to handle complaints and remedy damages of data subjects related to the processing of personal information.
          </p>
          <PrivacyList
            items={[
              { title: 'Name', text: 'TAEHONG KIM' },
              { title: 'Contact', text: (
                  <Link
                    className="text-app-primary dark:text-app-dark-primary underline"
                    href={`mailto:${DEVELOPER.EMAIL}`}
                  >
                    {DEVELOPER.EMAIL}
                  </Link>
                )},
            ]}
          />
          <p className="mt-sm">
            Users may contact the personal information protection officer for all inquiries, complaint handling, and damage relief related to personal information protection that arise while using the app.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 10 (Remedies for Infringement of Rights)">
          <p>
            To receive relief for personal information infringement, data subjects can apply for dispute resolution or counseling to the Personal Information Dispute Mediation Committee, the Korea Internet & Security Agency&apos;s Personal Information Infringement Report Center, etc.
          </p>
        </PrivacySection>

        <PrivacySection title="Article 11 (Changes to the Privacy Policy)">
          <p>
            This Privacy Policy will take effect from {startDate.format('YYYY-MM-DD')}. If there are any additions, deletions, or corrections to the contents due to changes in laws and policies, we will notify you through in-app announcements or our website at least 7 days before the changes take effect.
          </p>
        </PrivacySection>
      </div>
    </main>
  );
}
