import Link from 'next/link';
import { DEVELOPER } from '@/features/privacy';

export default function Page() {
  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8 p-md">
        <h1 className="font-semibold text-2xl mb-md">Blim Account Deletion Guide</h1>

        <section>
          <h2 className="font-semibold text-xl mb-sm">1. Delete Your Account in the App</h2>
          <p>You can delete your account directly in the Blim app using the path below.</p>
          <ol className="list-decimal ml-xl mt-sm">
            <li>Select the &quot;Profile&quot; tab in the bottom navigation.</li>
            <li>Open &quot;Privacy &amp; Security&quot;.</li>
            <li>Tap &quot;Delete Account&quot;.</li>
            <li>Review the notice and confirm by tapping &quot;Delete Account&quot;.</li>
          </ol>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">2. Request Deletion by Email</h2>
          <p>If you cannot access the app or log in, you can request account deletion by email.</p>
          <div className="mt-sm p-md rounded bg-app-sub-bg dark:bg-app-dark-sub-bg">
            <p>
              <span className="font-semibold">Email: </span>
              <Link
                className="text-app-primary dark:text-app-dark-primary underline"
                href={`mailto:${DEVELOPER.EMAIL}`}
              >
                {DEVELOPER.EMAIL}
              </Link>
            </p>
            <p className="mt-xs">
              <span className="font-semibold">Subject: </span>[Blim] Account Deletion Request
            </p>
            <p className="mt-xs">
              <span className="font-semibold">Required Info: </span>Sign-in method (Google/Guest) and
              account identifier (email or user ID)
            </p>
          </div>
          <p className="mt-sm">Requests are processed within 3 business days.</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">3. Data That Will Be Deleted</h2>
          <p>When deletion is completed, the following data will be removed.</p>
          <ul className="list-disc ml-xl mt-sm">
            <li>Account data (login identifier, email, profile display information)</li>
            <li>Chat messages, conversation summaries, and chat session data</li>
            <li>Character progress data (likes, unlocked cards, and related progress)</li>
            <li>Gem balance and wallet/purchase/subscription-related service data</li>
            <li>Support feedback and report history</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">4. Retention and Final Deletion</h2>
          <ul className="list-disc ml-xl">
            <li>After a deletion request, the account is deactivated immediately and may be kept for up to 30 days for recovery.</li>
            <li>If you log in again within 30 days, the account may be restored.</li>
            <li>After 30 days, account and service data are deleted.</li>
            <li>Certain records such as payment records may be retained as required by applicable law, then deleted.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">5. Contact</h2>
          <p>
            For account deletion questions, contact us at{' '}
            <Link
              className="text-app-primary dark:text-app-dark-primary underline"
              href={`mailto:${DEVELOPER.EMAIL}`}
            >
              {DEVELOPER.EMAIL}
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
