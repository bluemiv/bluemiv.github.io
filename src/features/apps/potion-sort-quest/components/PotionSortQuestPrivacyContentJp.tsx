import type { ComponentType, ReactNode } from 'react';
import { DEVELOPER } from '@/features/privacy';
import { POTION_SORT_QUEST_APP } from '../constants';

type ListProps = {
  children: ReactNode;
  ordered?: boolean;
};

type PotionSortQuestPrivacyContentJpProps = {
  components: {
    Section: ComponentType<{ title: string; children: ReactNode }>;
    List: ComponentType<ListProps>;
    Notice: ComponentType<{ children: ReactNode }>;
    PolicyLink: ComponentType<{ href: string; children: ReactNode }>;
  };
  effectiveDate: string;
  externalSiteLink: ReactNode;
};

export const PotionSortQuestPrivacyContentJp = ({
  components,
  effectiveDate,
  externalSiteLink,
}: PotionSortQuestPrivacyContentJpProps) => {
  const { Section, List, Notice, PolicyLink } = components;
  const { name: appName } = POTION_SORT_QUEST_APP;

  return (
    <>
      <div className="py-lg">
        <Notice>
          本プライバシーポリシーは、&lt;&lsquo;{appName}&rsquo;&gt;（ウェブサイト:{' '}
          {externalSiteLink}
          ）が、アプリ内データ、広告SDKによって処理されるデータ、端末内に保存される
          データ、およびユーザーの権利について説明するものです。{appName}
          はアカウント登録なしで利用でき、独自のユーザーデータベースまたはバックエンドサーバーを
          運営していません。一部の広告機能は Google AdMob SDK を通じて提供されます。
        </Notice>
      </div>

      <Section title="1. 利用目的">
        <p>
          {appName}
          は、以下の目的のために必要最小限のデータを処理します。法令で認められる場合、または必要な
          通知・同意がある場合を除き、これらの目的と関係のない用途には使用しません。
        </p>
        <List ordered>
          <li>
            <strong>アプリ機能の提供:</strong>{' '}
            ポーション色分けパズルのプレイ、レベル進行、ヒント、取り消し、コイン報酬、BGM設定、
            言語設定、アプリ設定の保存
          </li>
          <li>
            <strong>広告の提供:</strong> Google
            AdMobによるバナー広告、インタースティシャル広告、リワード広告の表示、広告効果の測定、
            不正な広告操作の防止
          </li>
          <li>
            <strong>レビュー依頼:</strong> Google
            Playレビュー依頼をユーザー体験を妨げないタイミングで表示するため、表示状態を端末内で管理
          </li>
        </List>
      </Section>

      <Section title="2. 収集されるデータおよび収集方法">
        <List ordered>
          <li>
            <strong>広告SDKを通じて処理される可能性があるデータ:</strong>{' '}
            Android広告ID（AAID/ADID）、アプリセットID、またはSDKインスタンス識別子
            <List>
              <li>
                広告関連の利用記録: 広告表示、クリック、リワード広告の完了などの広告イベントログ
              </li>
              <li>
                端末・アプリ情報:
                OSの種類とバージョン、端末モデル、アプリバージョン、ネットワーク状態など、 AdMob
                SDKが自動的に処理する可能性がある情報
              </li>
            </List>
            <Notice>
              広告IDは端末ごとにリセット可能な識別子です。ユーザーはAndroidの設定から広告IDを
              リセットまたは削除し、パーソナライズ広告を制限できます。
            </Notice>
          </li>
          <li>
            <strong>アプリ内に保存されるデータ:</strong>{' '}
            現在のレベル、コイン、ヒント・取り消しの状態、言語設定、BGM設定、レビュー依頼の表示状態、
            インタースティシャル広告の表示頻度状態は、ユーザーの端末内に保存されます。{appName}
            は、このローカルゲームデータを独自サーバーへ送信したり、アカウントに紐付けたりしません。
          </li>
          <li>
            <strong>当アプリが直接収集しないデータ:</strong>{' '}
            氏名、電話番号、メールアドレス、連絡先、正確な位置情報、写真、カメラデータ、マイク録音、
            決済情報などをアプリが直接収集することはありません。
          </li>
        </List>
      </Section>

      <Section title="3. 保有期間">
        <List ordered>
          <li>
            {appName}
            は、アカウント情報またはゲームプレイ記録を独自サーバーに保存しません。端末内のレベル進行、
            コイン、設定は、ユーザーがアプリデータを削除するか、アプリをアンインストールするまで端末内に
            残ります。
          </li>
          <li>
            Google AdMobを通じて処理される広告関連データは、Google
            LLCのポリシーに従って保有されます。
          </li>
          <li>
            適用法令により保有が必要な場合、当該法令で定められた期間保有されることがあります。
          </li>
        </List>
      </Section>

      <Section title="4. 第三者提供">
        <p>
          {appName}
          は個人情報を販売せず、独自サーバーに保存されたユーザーアカウント情報を第三者へ提供することも
          ありません。これは当アプリがそのようなサーバーを運営していないためです。広告SDKを通じて
          Google LLCが独自に処理するデータには、Google LLCのプライバシーポリシーが適用されます。
        </p>
      </Section>

      <Section title="5. 外部委託および国外移転">
        <List ordered>
          <li>
            {appName}
            は広告提供のためにGoogle AdMob SDKを使用します。この過程で広告関連データがGoogle LLCへ
            送信される可能性があり、Googleが事業を行う米国その他の地域への国外移転が発生する場合があります。
            <List>
              <li>委託先/受領者: Google LLC（AdMob）</li>
              <li>移転先: 米国およびGoogleが事業を行うその他の地域</li>
              <li>移転時期および方法: アプリ利用時にネットワークを通じて送信</li>
              <li>
                移転されるデータ:
                Android広告ID（AAID/ADID）、アプリセットIDまたはSDKインスタンス識別子、
                広告イベントログ、端末・アプリ情報
              </li>
              <li>利用目的: 広告配信、広告運用、分析、不正防止</li>
              <li>保有期間: Google LLCのポリシーに従います</li>
            </List>
          </li>
        </List>
      </Section>

      <Section title="6. Cookieおよび類似技術">
        <List ordered>
          <li>
            <strong>Cookie:</strong> {appName}
            はモバイルアプリであり、ウェブサイトのCookieを直接使用しません。
          </li>
          <li>
            <strong>Android広告ID（AAID/ADID）:</strong> 広告提供のために使用される場合があります。
            <List>
              <li>
                Android: 設定 &gt; プライバシー &gt; 広告 &gt; 広告IDのリセット/削除、または
                パーソナライズ広告の制限
              </li>
              <li>
                これらの設定を変更すると、パーソナライズ広告が制限されたり、広告IDがリセットまたは削除されたり
                する場合があります。
              </li>
            </List>
          </li>
        </List>
      </Section>

      <Section title="7. データの削除">
        <List ordered>
          <li>当アプリはアカウント情報を独自サーバーに保存しません。</li>
          <li>
            ローカルデータは、ユーザーがアプリデータを削除するか、アプリをアンインストールすると削除されます。
          </li>
          <li>将来、電子ファイルを別途保有する場合は、復元または再生が困難な方法で削除します。</li>
        </List>
      </Section>

      <Section title="8. 安全管理措置">
        <p>{appName}はユーザーデータを保護するため、以下の措置を講じます。</p>
        <List>
          <li>
            データ処理の最小化、アカウントサーバー非運用、第三者SDK設定の確認、アプリ権限の最小化、
            ゲーム状態のローカル保存、開発環境へのアクセス管理、セキュリティアップデートの確認
          </li>
        </List>
      </Section>

      <Section title="9. ユーザーの権利">
        <List>
          <li>
            ユーザーは、適用法令に従い、アクセス、訂正、削除、処理停止などを求めることができます。
            {appName}
            は独自サーバーにアカウントデータを保有していないため、ローカルアプリデータはアプリデータの削除
            またはアンインストールにより直接削除できます。
          </li>
          <li>
            お問い合わせは書面またはメールで送信できます。当方は適用法令に従って確認し、対応します。
          </li>
          <li>
            適用法令により請求の制限または拒否が認められる場合、当該法令が適用されることがあります。
          </li>
        </List>
      </Section>

      <Section title="10. プライバシーに関するお問い合わせ">
        <List>
          <li>個人情報保護責任者: Taehong Kim</li>
          <li>
            連絡先: {DEVELOPER.PHONE_NUMBER},{' '}
            <PolicyLink href={`mailto:${DEVELOPER.EMAIL}`}>{DEVELOPER.EMAIL}</PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="11. 外部サービス">
        <p>
          本アプリは広告提供のためにGoogle LLCのAdMob SDKを使用します。Google LLCが独自にデータを
          収集または処理する場合、Googleのプライバシーポリシーおよび広告ポリシーが適用されます。
        </p>
        <List>
          <li>
            Googleプライバシーポリシー:{' '}
            <PolicyLink href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </PolicyLink>
          </li>
          <li>
            Google広告設定:{' '}
            <PolicyLink href="https://adssettings.google.com">adssettings.google.com</PolicyLink>
          </li>
          <li>
            Google AdMobおよびGoogle Playデータ開示ガイド:{' '}
            <PolicyLink href="https://developers.google.com/admob/android/privacy/play-data-disclosure">
              developers.google.com/admob/android/privacy/play-data-disclosure
            </PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="12. 本ポリシーの変更">
        <p>
          本ポリシーは{effectiveDate}から適用されます。適用法令、アプリ機能、サービス提供者、
          またはデータの取扱いに変更がある場合、本ウェブサイト上で更新後の施行日とともに公開することがあります。
        </p>
      </Section>
    </>
  );
};
