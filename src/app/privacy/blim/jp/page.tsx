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
            { title: '🇺🇸 English', href: ROUTE_PATH.PRIVACY_BLIM_EN },
            { title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_BLIM_KO },
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
        <p>施行日: {effectiveDate.format('YYYY-MM-DD')}</p>
        <p>
          本ポリシーは、{companyName}（以下「当社」）が運営する {appName}{' '}
          における個人情報の取扱いを説明するものです。当社はサービス提供・安全運用に必要な範囲で個人情報を処理します。
        </p>
        <p>
          サイト:{' '}
          <Link className="text-app-primary dark:text-app-dark-primary underline" href={DEVELOPER.SITE_URL}>
            {DEVELOPER.SITE_URL}
          </Link>
        </p>

        <PrivacySection title="第1条（利用目的）">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'アカウント管理',
                text: 'ログイン/ゲスト連携、復旧、不正利用防止。',
              },
              {
                title: 'AIチャット提供',
                text: 'キャラクター応答生成、会話文脈維持、セッション同期。',
              },
              {
                title: '決済・サブスクリプション処理',
                text: 'Google Play 決済検証、ジェム付与、重複付与防止。',
              },
              {
                title: '広告・リワード運用',
                text: 'AdMob 広告配信、報酬広告の上限管理、広告イベント計測。',
              },
              {
                title: '安全対策・サポート',
                text: '通報/問い合わせ対応、不正行為調査、障害対応。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第2条（取得・処理する情報）">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'アカウント情報',
                text: 'ソーシャルログイン識別子、メールアドレス（提供時）、表示プロフィール情報。',
              },
              {
                title: 'サービス利用情報',
                text: 'チャットメッセージ、会話要約、進行データ（いいね/カード解放）、利用メタデータ。',
              },
              {
                title: '決済情報',
                text: 'Google Play 商品ID、注文/購入トークン、決済状態、ウォレット取引履歴。',
              },
              {
                title: '技術・セキュリティログ',
                text: 'IP、端末/アプリバージョン、セッションログ、エラーログ、不正検知情報。',
              },
              {
                title: '広告関連情報',
                text: '広告識別子（AAID）および広告イベント（表示/クリック等）。',
              },
              {
                title: '任意情報',
                text: 'アプリ内サポートやメールで利用者が送信した内容。',
              },
              {
                title: '原則として取得しない情報',
                text: '公的身分証番号、精密位置情報、端末の連絡先/写真原本。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第3条（取得方法）">
          <PrivacyList
            items={[
              { text: '認証事業者・アプリストアから提供される情報。' },
              { text: 'サービス利用時に自動生成・収集される情報。' },
              { text: 'OpenAI、Supabase、Google Play、AdMob などの連携サービス/SDK。' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第4条（保存期間）">
          <PrivacyList
            type="ol"
            items={[
              { title: 'アカウント利用中', text: 'サービス提供に必要な期間保持します。' },
              {
                title: '退会後',
                text: '復旧・紛争・不正対応のため最大30日間マスキング/制限保管後に削除する場合があります。',
              },
              {
                title: '法令保管',
                text: '決済関連記録などは法令に基づき別途保管される場合があります。',
              },
              {
                title: 'セキュリティログ',
                text: 'インシデント対応に必要な最小期間のみ保持します。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第5条（第三者提供）">
          <p>
            当社は個人情報を販売しません。法令に基づく場合、本人同意がある場合、またはサービス運営・安全確保に必要な範囲でのみ提供します。
          </p>
        </PrivacySection>

        <PrivacySection title="第6条（委託・国外移転）">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Supabase, Inc.（米国）',
                text: 'バックエンド基盤、認証、データベース、ストレージ運用。',
              },
              {
                title: 'OpenAI, Inc.（米国）',
                text: '暗号化 API 通信による AI 応答生成。',
              },
              {
                title: 'Google LLC（米国）',
                text: 'Google Play 決済検証および AdMob 広告配信・計測。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第7条（広告識別子と設定）">
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: '設定 > プライバシー > 広告 > 広告IDのリセット/削除、広告のパーソナライズ無効化。',
              },
              {
                text: '設定変更後はパーソナライズ広告が制限される場合がありますが、一般広告は表示されることがあります。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第8条（利用者の権利）">
          <PrivacyList
            items={[
              { text: '利用者は、法令に基づき開示・訂正・削除等を請求できます。' },
              {
                text: (
                  <span>
                    退会はアプリ内機能、または次の案内ページから申請できます:{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href={ROUTE_PATH.ACCOUNT_DELETION_BLIM}
                    >
                      {ROUTE_PATH.ACCOUNT_DELETION_BLIM}
                    </Link>
                    。
                  </span>
                ),
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第9条（未成年者）">
          <p>
            未成年者による利用が確認された場合、法令およびポリシーに基づきアカウント制限または削除を行うことがあります。
          </p>
        </PrivacySection>

        <PrivacySection title="第10条（安全管理措置）">
          <PrivacyList
            items={[
              { text: '通信の暗号化（TLS/HTTPS）とアクセス権限制御。' },
              { text: '機密情報の分離管理とサーバー側検証。' },
              { text: '異常アクセス・不正決済・濫用の監視。' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第11条（本ポリシーの変更）">
          <p>
            法令やサービス変更に応じて本ポリシーを更新することがあります。重要な変更は、施行前に
            アプリ内告知またはウェブサイトで案内します。
          </p>
        </PrivacySection>

        <PrivacySection title="第12条（お問い合わせ）">
          <PrivacyList
            items={[
              { title: '事業者', text: companyName },
              {
                title: 'メール',
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
