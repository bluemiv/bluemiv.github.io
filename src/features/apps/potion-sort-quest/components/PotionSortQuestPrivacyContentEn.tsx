import type { ComponentType, ReactNode } from 'react';
import { DEVELOPER } from '@/features/privacy';
import { POTION_SORT_QUEST_APP } from '../constants';

type ListProps = {
  children: ReactNode;
  ordered?: boolean;
};

type PotionSortQuestPrivacyContentEnProps = {
  components: {
    Section: ComponentType<{ title: string; children: ReactNode }>;
    List: ComponentType<ListProps>;
    Notice: ComponentType<{ children: ReactNode }>;
    PolicyLink: ComponentType<{ href: string; children: ReactNode }>;
  };
  effectiveDate: string;
  externalSiteLink: ReactNode;
};

export const PotionSortQuestPrivacyContentEn = ({
  components,
  effectiveDate,
  externalSiteLink,
}: PotionSortQuestPrivacyContentEnProps) => {
  const { Section, List, Notice, PolicyLink } = components;
  const { name: appName } = POTION_SORT_QUEST_APP;

  return (
    <>
      <div className="py-lg">
        <Notice>
          This Privacy Policy explains how &lt;&lsquo;{appName}&rsquo;&gt; (website:{' '}
          {externalSiteLink}) handles app data, advertising SDK data, local device storage, and user
          rights. {appName} can be used without creating an account and does not operate its own
          user database or backend server. Some advertising features are provided through the Google
          AdMob SDK.
        </Notice>
      </div>

      <Section title="1. Purpose of Processing">
        <p>
          {appName} processes the minimum data necessary for the purposes below. We do not use the
          data for unrelated purposes unless required by law or with separate notice or consent
          where applicable.
        </p>
        <List ordered>
          <li>
            <strong>Providing app features:</strong> potion color sorting puzzle play, level
            progress, hints, undo, coin rewards, background music settings, language settings, and
            app settings storage
          </li>
          <li>
            <strong>Providing ads:</strong> displaying banner, interstitial, and rewarded ads
            through Google AdMob, measuring ad performance, and preventing invalid activity
          </li>
          <li>
            <strong>Review prompt:</strong> managing, on the device, whether a Google Play review
            prompt has been shown within a user-friendly timing window
          </li>
        </List>
      </Section>

      <Section title="2. Data Collected and Collection Method">
        <List ordered>
          <li>
            <strong>Data that may be processed through the advertising SDK:</strong> Android
            Advertising ID (AAID/ADID), app set ID, or SDK instance identifiers
            <List>
              <li>
                Ad-related activity: ad impressions, clicks, rewarded ad completion, and similar ad
                event logs
              </li>
              <li>
                Device and app information: operating system type and version, device model, app
                version, network status, and other information that the AdMob SDK may process
                automatically
              </li>
            </List>
            <Notice>
              The advertising identifier is resettable on the device. Users can reset or delete it
              and limit personalized ads from Android settings.
            </Notice>
          </li>
          <li>
            <strong>Data stored inside the app:</strong> current level, coins, hint and undo state,
            language setting, background music setting, review prompt state, and interstitial ad
            frequency state are stored locally on the user&apos;s device. {appName} does not send
            this local game data to its own server or link it to an account.
          </li>
          <li>
            <strong>Data we do not collect directly:</strong> The app does not directly collect
            names, phone numbers, email addresses, contacts, precise location, photos, camera data,
            microphone recordings, or payment information.
          </li>
        </List>
      </Section>

      <Section title="3. Retention Period">
        <List ordered>
          <li>
            {appName} does not store account information or gameplay records on its own server.
            Local level progress, coins, and settings remain on the device until the user clears app
            data or deletes the app.
          </li>
          <li>
            Advertising-related data processed through Google AdMob is retained according to Google
            LLC&apos;s own policies.
          </li>
          <li>
            If retention is required by applicable law, data may be retained for the period required
            by that law.
          </li>
        </List>
      </Section>

      <Section title="4. Disclosure to Third Parties">
        <p>
          {appName} does not sell personal information and does not provide user account information
          stored on its own server to third parties, because it does not operate such a server. Data
          independently processed by Google LLC through the advertising SDK is governed by Google
          LLC&apos;s own privacy policies.
        </p>
      </Section>

      <Section title="5. Service Providers and International Transfer">
        <List ordered>
          <li>
            {appName} uses the Google AdMob SDK to provide ads. During this process, advertising
            data may be transmitted to Google LLC, which may involve international transfer to the
            United States and other locations where Google operates.
            <List>
              <li>Service provider/recipient: Google LLC (AdMob)</li>
              <li>Country: United States and other locations where Google operates</li>
              <li>Timing and method: transmitted over the network during app use</li>
              <li>
                Data transferred: Android Advertising ID (AAID/ADID), app set ID or SDK instance
                identifiers, ad event logs, device and app information
              </li>
              <li>Purpose: ad delivery, ad operations, analytics, and fraud prevention</li>
              <li>Retention period: according to Google LLC policies</li>
            </List>
          </li>
        </List>
      </Section>

      <Section title="6. Cookies and Similar Technologies">
        <List ordered>
          <li>
            <strong>Cookies:</strong> {appName} is a mobile app and does not directly use website
            cookies.
          </li>
          <li>
            <strong>Android Advertising ID (AAID/ADID):</strong> This may be used for advertising.
            <List>
              <li>
                Android: Settings &gt; Privacy &gt; Ads &gt; Reset/Delete Advertising ID or limit
                personalized ads
              </li>
              <li>
                Changing these settings may limit personalized ads or reset/delete the advertising
                identifier.
              </li>
            </List>
          </li>
        </List>
      </Section>

      <Section title="7. Data Deletion">
        <List ordered>
          <li>The app does not store account information on its own server.</li>
          <li>Local data is deleted when the user clears app data or deletes the app.</li>
          <li>
            If we separately retain electronic files in the future, they will be deleted using a
            method designed to prevent recovery or restoration.
          </li>
        </List>
      </Section>

      <Section title="8. Security Measures">
        <p>{appName} applies the following measures to protect user data.</p>
        <List>
          <li>
            Data minimization, no account server, review of third-party SDK settings, minimum app
            permissions, local storage for game state, controlled development access, and security
            update checks
          </li>
        </List>
      </Section>

      <Section title="9. User Rights">
        <List>
          <li>
            Users may request access, correction, deletion, or suspension of processing where
            applicable. Since {appName} does not keep account data on its own server, local app data
            can be deleted directly by clearing app data or uninstalling the app.
          </li>
          <li>
            Requests can be submitted in writing or by email. We will review and respond according
            to applicable legal requirements.
          </li>
          <li>
            If applicable law allows a request to be limited or denied, the relevant legal rules may
            apply.
          </li>
        </List>
      </Section>

      <Section title="10. Privacy Contact">
        <List>
          <li>Privacy officer: Taehong Kim</li>
          <li>
            Contact: {DEVELOPER.PHONE_NUMBER},{' '}
            <PolicyLink href={`mailto:${DEVELOPER.EMAIL}`}>{DEVELOPER.EMAIL}</PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="11. External Services">
        <p>
          This app uses Google LLC&apos;s AdMob SDK for advertising. When Google LLC independently
          collects or processes data, Google&apos;s privacy policies and advertising policies apply.
        </p>
        <List>
          <li>
            Google Privacy Policy:{' '}
            <PolicyLink href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </PolicyLink>
          </li>
          <li>
            Google Ads Settings:{' '}
            <PolicyLink href="https://adssettings.google.com">adssettings.google.com</PolicyLink>
          </li>
          <li>
            Google AdMob and Google Play data disclosure guide:{' '}
            <PolicyLink href="https://developers.google.com/admob/android/privacy/play-data-disclosure">
              developers.google.com/admob/android/privacy/play-data-disclosure
            </PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="12. Changes to This Policy">
        <p>
          This policy is effective as of {effectiveDate}. If applicable laws, app features, service
          providers, or data practices change, we may update this policy and publish the updated
          effective date on this website.
        </p>
      </Section>
    </>
  );
};
