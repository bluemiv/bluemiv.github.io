import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/entities/privacy';
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
            { title: '🇺🇸 English', href: ROUTE_PATH.PRIVACY_KPOP_EN },
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
        <h1 className="font-semibold text-2xl mb-md">プライバシーポリシー</h1>
        <p>施行日: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          本プライバシーポリシーは、&lt;&lsquo;{appName}&rsquo;&gt;（アクセス先:{' '}
          <Link
            className="text-app-primary dark:text-app-dark-primary underline"
            href={DEVELOPER.SITE_URL}
          >
            {DEVELOPER.SITE_URL}
          </Link>
          ）が、情報主体の個人情報を保護し、関連する苦情を迅速かつ円滑に処理するため、
          「個人情報保護法」第30条に基づき策定・公表するものです。
        </p>

        <PrivacySection title="第1条（取扱いの目的）">
          <p>
            {appName}は、以下の目的のために最小限の個人情報のみを取り扱います。記載の目的以外で
            利用することはなく、目的が変更される場合は「個人情報保護法」第18条に基づき、
            別途同意の取得など必要な措置を講じます。
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'コンテンツ提供',
                text: '特定アーティストのYouTube動画視聴機能、ならびにインターネット上で公開されている写真をアプリ内でダウンロードできる機能の提供',
              },
              {
                title: '広告提供・分析・品質向上',
                text: 'パーソナライズ広告配信、不正クリック防止、アプリ利用分析（GA4）、およびサービス品質の改善',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第2条（収集項目および収集方法）">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '収集項目（必須）— モバイル広告ID',
                text: 'Android Advertising ID（AAID/ADID）または iOS IDFA',
                children: [
                  {
                    title: '広告・分析に関する利用記録',
                    text: '広告の表示／クリック、画面閲覧、ボタンタップなどのイベントログ',
                  },
                  {
                    title: 'デバイスおよびアプリ情報',
                    text: 'OS種別／バージョン、端末モデル、アプリバージョン等（分析SDKにより自動収集される場合あり）',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    広告IDは端末ごとにリセット可能な識別子です。端末の設定からリセット・削除、
                    あるいはパーソナライズド広告の制限を行うことができます。
                  </div>
                ),
              },
              {
                title: '収集方法',
                children: [
                  {
                    text: '会員登録やログインの手続きは不要で、アプリのインストールおよび利用時に、モバイルSDK（例：Google AdMob, GA4）を通じて自動的に収集されます。',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第3条（保有および利用期間）">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '{appName}は、利用者の識別情報を長期保存するための独自サーバーを運用していません。広告・分析目的のデータは、各SDK事業者の保存期間設定およびポリシーに従います。',
              },
              {
                title: 'GA4の保存期間',
                text: '管理者は2か月または14か月から選択できます。Google Signalsのデータは、この設定に関わらず最長26か月保存される場合があります。',
              },
              {
                title:
                  '目的達成または保存期間の経過時には遅滞なく破棄し、法令により必要な場合は別途区分して保管します。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第4条（第三者提供）">
          {appName}
          は、原則として利用者の個人情報を第三者に提供しません。ただし、法令に根拠がある場合や、
          情報主体の別途同意がある場合には提供することがあります。
        </PrivacySection>

        <PrivacySection title="第5条（取扱いの委託および越境移転）">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '安定的なサービス提供のため、個人情報取扱い業務の一部を外部に委託する場合があります。受託者が海外に所在する場合、越境移転が発生します。委託契約の締結にあたっては、関連法令を遵守します。',
                children: [
                  { title: '受託者／移転先', text: 'Google LLC（AdMob, Google Analytics）' },
                  { title: '移転先の国', text: '米国' },
                  {
                    title: '移転時期・方法',
                    text: 'アプリ利用の都度、ネットワークを介してリアルタイムに送信',
                  },
                  {
                    title: '移転される項目',
                    text: '広告ID（AAID/IDFA）、利用記録（広告表示／クリック、イベントログ等）、デバイス・アプリ情報（OS、端末モデル、アプリバージョン等）',
                  },
                  { title: '利用目的', text: '広告配信、統計分析、サービス品質の改善' },
                  { title: '保有・利用期間', text: '第3条および各受託者のポリシーに従う' },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    （参考）Androidでは、設定から広告IDのリセット／削除およびパーソナライズド広告の制限が可能です。
                  </div>
                ),
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第6条（自動収集ツールの設置・運用および拒否）">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'クッキー',
                text: 'モバイルアプリの特性上、{appName}はクッキーを使用しません。',
              },
              {
                title: '広告ID（AAID/IDFA）',
                text: '広告配信および分析のために使用します。',
                children: [
                  {
                    title: 'Android',
                    text: '設定 ＞ プライバシー ＞ 広告 ＞ 広告IDのリセット／削除、パーソナライズド広告の制限が可能',
                  },
                  {
                    text: '（iOSでも設定からトラッキング許可を管理できます。）これらの設定を変更すると、パーソナライズド広告が制限されたり、関連する識別子がリセット／削除される場合があります。',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第7条（個人情報の破棄手続きおよび方法）">
          <PrivacyList
            type="ol"
            items={[
              { text: '破棄事由が生じた場合、遅滞なく破棄します。' },
              { title: '電子ファイル', text: '復元・再生が不可能な技術的方法で完全削除' },
              { title: '紙媒体', text: '裁断または焼却' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第8条（安全管理措置）">
          {appName}は「個人情報の安全性確保のための基準」に従い、以下の措置を講じます。
          <PrivacyList
            items={[
              {
                text: '内部管理計画の策定・実施、アクセス権限管理、接続記録の保存と改ざん防止、暗号化（可能な範囲）、マルウェア対策・セキュリティプログラムの適用、定期点検と教育など',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第9条（情報主体の権利・義務および行使方法）">
          <PrivacyList
            items={[
              {
                text: '情報主体は、{appName}に対していつでも開示・訂正・削除・処理停止を求める権利を行使できます。代理人による行使も可能です（所定様式の委任状が必要）。',
              },
              {
                text: '請求は書面、メール、FAX等で行うことができ、{appName}は遅滞なく対応します。',
              },
              {
                text: '法令に基づき開示制限や処理停止の拒否事由がある場合は、関係規定に従います。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第10条（個人情報保護責任者および開示請求窓口）">
          <PrivacyList
            items={[
              { title: '個人情報保護責任者', text: 'Kim Taehong（職名・職位：なし）' },
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
              { title: '開示請求の受付・処理窓口', text: '上記と同じ' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第11条（権利侵害に対する救済方法）">
          <PrivacyList
            items={[
              {
                text: '個人情報侵害に関する相談・紛争解決を希望される場合は、以下の機関へお問い合わせください。',
              },
              {
                title: '個人情報紛争調整委員会',
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
                title: '個人情報侵害申告センター（KISA）',
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
                title: '大検察庁',
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
                title: '警察庁 サイバー犯罪申告',
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

        <PrivacySection title="第12条（外部サービスとの連携）">
          本アプリは、YouTubeのリンク／プレーヤーを通じてコンテンツを提供します。YouTubeまたは他の
          外部プラットフォームが独自に個人情報を収集・処理する場合、当該事業者のポリシーが適用されます。
          詳細は各事業者のポリシーをご確認ください。
        </PrivacySection>

        <PrivacySection title="第13条（本ポリシーの変更）">
          本ポリシーは {startDate.format('YYYY-MM-DD')} から適用されます。法令、サービス内容、
          受託者の変更等がある場合、ウェブサイト上の告知等を通じて変更内容および施行日をお知らせします。
        </PrivacySection>
      </div>
    </main>
  );
}
