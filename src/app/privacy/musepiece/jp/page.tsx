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
            { title: '🇺🇸 English', href: ROUTE_PATH.PRIVACY_MUSEPIECE_EN },
            { title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_MUSEPIECE_KO },
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

        <h1 className="font-semibold text-2xl mb-md">プライバシーポリシー</h1>
        <p>施行日: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          本プライバシーポリシーは、&lt;{companyName}&gt;が運営する&lt;{appName}
          &gt;（以下「本アプリ」）に
          おいて、利用者の個人情報を保護し、関連するお問い合わせに適切に対応するため、関係法令に
          基づき策定・公開するものです。
        </p>

        <PrivacySection title="第1条（個人情報の利用目的）">
          <p>本アプリは、以下の目的の範囲で必要最小限の情報を取り扱います。</p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'ゲーム機能の提供',
                text: 'パズル進行、ギャラリー解放、コイン、設定・環境値の保存および復元',
              },
              {
                title: '広告配信と無料運営',
                text: 'Google AdMobによる広告表示およびリワード広告結果の処理',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第2条（取得・処理する情報と取得方法）">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '端末内（ローカル）に保存される情報',
                children: [
                  { text: 'パズル進行情報（クリア状態、移動/時間記録、星、解放状態）' },
                  { text: 'コインおよびリワード広告状態（日次上限・クールダウン状態）' },
                  { text: 'アプリ設定（言語、BGMオン/オフなど）' },
                ],
              },
              {
                title: '広告SDK（AdMob）が自動取得する情報',
                children: [
                  {
                    title: '広告識別子',
                    text: 'AAID/ADID（Android）またはIDFA（iOS）',
                  },
                  {
                    title: '広告イベントログ',
                    text: '広告表示・クリック・報酬完了イベント',
                  },
                  {
                    title: '端末/アプリ情報',
                    text: 'OS・バージョン、端末モデル、アプリバージョン等の技術情報',
                  },
                ],
              },
              {
                title: '取得方法',
                text: 'アプリ利用時に、アプリの処理およびGoogle AdMob SDKを通じて自動的に取得・処理されます。',
              },
              {
                title: '本アプリが直接取得しない情報',
                text: '本アプリは会員登録を必要とせず、氏名・電話番号・精密位置情報などの直接識別情報をアプリ側で取得しません。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第3条（保有期間および利用期間）">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '本アプリはユーザーアカウント用の専用バックエンドを運用せず、ゲーム・設定データは端末内に保存されます。',
              },
              {
                text: 'アプリを削除すると、端末内のローカルデータは削除されます。',
              },
              {
                text: 'AdMob経由の広告関連データはGoogle LLCのポリシーに従って処理されます。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第4条（第三者提供）">
          <p>本アプリは、法令上の根拠がある場合を除き、利用者の個人情報を第三者に提供しません。</p>
        </PrivacySection>

        <PrivacySection title="第5条（委託および国外移転）">
          <PrivacyList
            items={[
              { title: '委託先/移転先', text: 'Google LLC (AdMob)' },
              { title: '移転先国', text: '米国' },
              {
                title: '移転時期/方法',
                text: '広告リクエスト時にネットワークを通じてリアルタイム送信',
              },
              {
                title: '移転項目',
                text: '広告識別子、広告イベントログ、端末/アプリ情報',
              },
              { title: '利用目的', text: '広告配信および効果処理' },
              { title: '保有・利用期間', text: 'Google LLCのポリシーに準拠' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第6条（利用者の権利と行使方法）">
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: '設定 > プライバシー > 広告 > 広告IDのリセット/削除、パーソナライズ広告の制限',
              },
              {
                title: 'iOS',
                text: '設定 > プライバシーとセキュリティ > トラッキング > アプリのトラッキング許可をオフ',
              },
              {
                text: 'パーソナライズ広告を制限しても、一般広告は表示される場合があります。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第7条（情報の削除）">
          <p>
            本アプリはローカル保存中心の構成であり、アプリ削除時に端末内ゲームデータも削除されます。
          </p>
        </PrivacySection>

        <PrivacySection title="第8条（安全管理措置）">
          <PrivacyList
            items={[
              {
                text: '最小限収集、ローカル優先保存、外部SDKのセキュア設定適用などの安全対策を実施します。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第9条（個人情報に関するお問い合わせ先）">
          <PrivacyList
            items={[
              { title: '担当者', text: 'TAEHONG KIM' },
              {
                title: '連絡先',
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

        <PrivacySection title="第10条（外部サービス連携）">
          <PrivacyList
            items={[
              {
                title: 'Google AdMob',
                text: 'バナー広告・リワード広告の提供に利用します。',
              },
              {
                title: 'Google Play In-App Review',
                text: 'アプリ内レビュー誘導UIが表示される場合があり、レビュー投稿および関連データはアプリストア事業者のポリシーに従って処理されます。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第11条（プライバシーポリシーの変更）">
          <p>
            本ポリシーは{startDate.format('YYYY-MM-DD')}
            から適用されます。法令またはサービス変更により内容が更新される場合は、本ページで告知します。
          </p>
        </PrivacySection>
      </div>
    </main>
  );
}
