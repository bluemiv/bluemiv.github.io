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
            { title: '🇺🇸 English', href: ROUTE_PATH.PRIVACY_AI_WALLPAPER_EN },
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
          本プライバシーポリシーは、&lt;{appName}&gt;（以下「本アプリ」）を運営する&lt;{companyName}&gt;が、「個人情報の保護に関する法律」に基づき、情報主体（以下「利用者」）の個人情報を保護し、関連する苦情を迅速かつ円滑に処理するために策定・公開するものです。
        </p>

        <PrivacySection title="第1条（個人情報の取り扱い目的）">
          <p>
            {companyName}は、以下の目的のために最小限の個人情報を取り扱います。取り扱っている個人情報は、以下の目的以外には利用せず、利用目的が変更される場合は、「個人情報の保護に関する法律」第18条に基づき、別途同意を得るなど必要な措置を講じます。
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '主要機能の提供',
                text: 'AI生成画像の壁紙検索、お気に入り登録（端末内保存）、画像ダウンロード機能の提供',
              },
              {
                title: '広告の提供',
                text: 'Google AdMobを通じたパーソナライズ広告の表示およびサービスの無料運営',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第2条（取り扱う個人情報の項目および収集方法）">
          <p>
            本アプリは、別途会員登録手続きはなく、氏名、連絡先など個人を特定できる情報を直接収集しません。サービスの利用過程で、以下の情報が自動的に収集されることがあります。
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '収集項目',
                children: [
                  {
                    title: '広告識別子',
                    text: 'Android広告ID（AAID）またはiOS広告識別子（IDFA）',
                  },
                  {
                    title: '端末およびアプリ利用情報',
                    text: '広告の表示・クリック履歴、端末のOSバージョン、端末モデル、アプリのバージョンなど、広告SDKが自動収集する非識別情報',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    広告識別子は、利用者が端末の設定でリセットしたり、収集を拒否したりできる非永続的な識別子です。
                  </div>
                ),
              },
              {
                title: '収集方法',
                text: '利用者がアプリをインストールして実行する過程で、広告SDK（Google AdMob）を通じて自動的に収集されます。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第3条（個人情報の保有および利用期間）">
          <p>
            {companyName}は、別途サーバーを通じて個人情報を保存しないため、アプリを削除すると、お気に入りなどすべてのデータは利用者の端末から完全に削除されます。広告目的で自動収集された情報は、以下の委託先のポリシーに従って処理されます。
          </p>
        </PrivacySection>

        <PrivacySection title="第4条（個人情報の第三者提供）">
          <p>
            {companyName}は、利用者の個人情報を第1条（個人情報の取り扱い目的）で明示した範囲内でのみ取り扱い、法令に特別な規定がある場合を除き、利用者の同意なしに第三者に提供しません。
          </p>
        </PrivacySection>

        <PrivacySection title="第5条（個人情報の取り扱いの委託および国外移転）">
          <p>
            {companyName}は、円滑なサービス提供のため、以下のように個人情報の取り扱い業務を国外の事業者に委託しています。
          </p>
          <PrivacyList
            items={[
              {
                title: '委託先（移転先）',
                text: 'Google LLC (AdMob)',
              },
              {
                title: '移転される国',
                text: 'アメリカ合衆国',
              },
              {
                title: '移転日時および方法',
                text: 'アプリでの広告リクエスト時にネットワークを通じてリアルタイムで転送',
              },
              {
                title: '移転する個人情報の項目',
                text: '広告識別子（AAID/IDFA）、端末およびアプリ利用情報',
              },
              {
                title: '委託業務内容（利用目的）',
                text: 'パーソナライズ広告の提供および広告成果の測定',
              },
              {
                title: '保有および利用期間',
                text: '当該委託先のプライバシーポリシーに従う',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第6条（情報主体の権利・義務およびその行使方法）">
          <p>
            情報主体は、広告識別子に関して以下の権利を行使することができます。
          </p>
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: '「設定」>「プライバシー」>「広告」>「広告IDをリセット」または「広告IDを削除」、「広告のカスタマイズをオプトアウト」',
              },
              {
                title: 'iOS',
                text: '「設定」>「プライバシーとセキュリティ」>「トラッキング」>「Appからのトラッキング要求を許可」をオフ',
              },
              {
                text: '上記の設定を変更すると、パーソナライズ広告の受信が制限されることがありますが、一般の広告は引き続き表示される場合があります。'
              }
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第7条（個人情報の破棄）">
          <p>
            {companyName}は、別途個人情報を保存・管理していないため、破棄手続きを行いません。利用者がアプリを削除すると、すべてのデータが破棄されます。
          </p>
        </PrivacySection>

        <PrivacySection title="第8条（個人情報の安全性の確保措置）">
          <p>
            {companyName}は、個人情報の安全性を確保するために技術的、管理的対策を講じています。ただし、個人情報を直接収集・保存しないため、ほとんどの措置は広告SDK提供業者であるGoogleのポリシーを遵守します。
          </p>
        </PrivacySection>

        <PrivacySection title="第9条（個人情報保護責任者）">
          <p>
            {companyName}は、個人情報の取り扱いに関する業務を総括して責任を負い、個人情報の取り扱いに関連する利用者の苦情処理および被害救済などのために、以下のように個人情報保護責任者を指定しています。
          </p>
          <PrivacyList
            items={[
              { title: '氏名', text: 'TAEHONG KIM' },
              { title: '連絡先', text: (
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
            利用者は、本アプリを利用中に発生したすべての個人情報保護に関する問い合わせ、苦情処理、被害救済などに関する事項を個人情報保護責任者にお問い合わせいただけます。
          </p>
        </PrivacySection>

        <PrivacySection title="第10条（権利侵害の救済方法）">
          <p>
            利用者は、個人情報の侵害による救済を受けるために、個人情報保護委員会、地域の消費者センターなどに紛争解決や相談などを申請することができます。
          </p>
        </PrivacySection>

        <PrivacySection title="第11条（プライバシーポリシーの変更）">
          <p>
            本プライバシーポリシーは{startDate.format('YYYY-MM-DD')}から適用されます。法令および方針による変更内容の追加、削除、修正がある場合は、変更事項の施行7日前からアプリ内のお知らせまたはウェブサイトを通じて告知します。
          </p>
        </PrivacySection>
      </div>
    </main>
  );
}
