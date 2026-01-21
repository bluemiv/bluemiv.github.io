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
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_AI_WALLPAPER_JP },
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
        <h1 className="font-semibold text-2xl mb-md">개인정보 처리방침</h1>
        <p>시행일자: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          본 개인정보 처리방침은 &lt;{appName}&gt;(이하 &apos;앱&apos;)을 운영하는 &lt;{companyName}&gt;이(가) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 관련 고충을 신속하고 원활하게 처리하기 위하여 수립·공개하는 지침입니다.
        </p>

        <PrivacySection title="제1조(개인정보의 처리 목적)">
          <p>
            {companyName}은(는) 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '핵심 기능 제공',
                text: 'AI 생성 이미지 배경화면 탐색, 즐겨찾기(기기 내 저장), 이미지 다운로드 기능 제공',
              },
              {
                title: '광고 제공',
                text: 'Google AdMob을 통한 맞춤형 광고 노출 및 서비스 무료 운영',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제2조(처리하는 개인정보의 항목 및 수집 방법)">
          <p>
            {appName}은 별도의 회원가입 절차가 없으며, 이름, 연락처 등 개인을 식별할 수 있는 정보를 직접 수집하지 않습니다. 서비스 이용 과정에서 아래와 같은 정보들이 자동으로 수집될 수 있습니다.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '수집 항목',
                children: [
                  {
                    title: '광고 식별자',
                    text: 'Android 광고 ID(AAID) 또는 iOS 광고 식별자(IDFA)',
                  },
                  {
                    title: '기기 및 앱 이용 정보',
                    text: '광고 노출/클릭 기록, 기기 OS 버전, 단말기 모델, 앱 버전 등 광고 SDK가 자동 수집하는 비식별 정보',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    광고 식별자는 사용자가 기기 설정에서 재설정하거나 수집을 거부할 수 있는 비영구적 식별자입니다.
                  </div>
                ),
              },
              {
                title: '수집 방법',
                text: '사용자가 앱을 설치하고 실행하는 과정에서 광고 SDK(Google AdMob)를 통해 자동으로 수집됩니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제3조(개인정보의 보유 및 이용 기간)">
          <p>
            {companyName}은(는) 별도의 서버를 통해 개인정보를 저장하지 않으므로, 앱 삭제 시 즐겨찾기 등 모든 데이터는 사용자의 기기에서 영구적으로 삭제됩니다. 광고 목적으로 자동 수집된 정보는 아래 수탁자의 정책에 따라 처리됩니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제4조(개인정보의 제3자 제공)">
          <p>
            {companyName}은(는) 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 법률에 특별한 규정이 있는 경우를 제외하고는 정보주체의 동의 없이 제3자에게 제공하지 않습니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제5조(개인정보 처리의 위탁 및 국외 이전)">
          <p>
            {companyName}은(는) 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리업무를 국외 사업자에게 위탁하고 있습니다.
          </p>
          <PrivacyList
            items={[
              {
                title: '수탁업체 (이전받는 자)',
                text: 'Google LLC (AdMob)',
              },
              {
                title: '이전되는 국가',
                text: '미국',
              },
              {
                title: '이전 일시 및 방법',
                text: '앱에서 광고 요청 시 네트워크를 통해 실시간 전송',
              },
              {
                title: '이전하는 개인정보 항목',
                text: '광고 식별자(AAID/IDFA), 기기 및 앱 이용 정보',
              },
              {
                title: '위탁업무 내용 (이용 목적)',
                text: '맞춤형 광고 제공 및 광고 성과 측정',
              },
              {
                title: '보유 및 이용 기간',
                text: '해당 수탁업체의 개인정보 처리방침에 따름',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제6조(정보주체의 권리·의무 및 행사 방법)">
          <p>
            정보주체는 광고 식별자와 관련하여 다음과 같은 권리를 행사할 수 있습니다.
          </p>
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: '설정 > 개인정보 보호 > 광고 > 광고 ID 재설정 또는 삭제, 광고 맞춤설정 선택 해제',
              },
              {
                title: 'iOS',
                text: '설정 > 개인정보 보호 및 보안 > 추적 > 앱이 추적을 요청하도록 허용 끄기',
              },
              {
                text: '위 설정을 변경하면 맞춤형 광고 수신이 제한될 수 있으나, 일반 광고는 계속 표시될 수 있습니다.'
              }
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제7조(개인정보의 파기)">
          <p>
            {companyName}은(는) 별도로 개인정보를 저장 및 관리하지 않으므로 파기 절차를 수행하지 않습니다. 사용자가 앱을 삭제하면 모든 데이터가 파기됩니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제8조(개인정보의 안전성 확보 조치)">
          <p>
            {companyName}은(는) 개인정보의 안전성 확보를 위해 기술적, 관리적 대책을 강구하고 있습니다. 다만, 개인정보를 직접 수집·저장하지 않으므로 대부분의 조치는 광고 SDK 제공업체인 Google의 정책을 준수합니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제9조(개인정보 보호책임자)">
          <p>
            {companyName}은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <PrivacyList
            items={[
              { title: '성명', text: 'TAEHONG KIM' },
              { title: '연락처', text: (
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
            정보주체는 앱을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의할 수 있습니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제10조(권익침해 구제 방법)">
          <p>
            정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁 해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
          </p>
          <PrivacyList
            items={[
              {
                title: '개인정보분쟁조정위원회',
                text: '(국번없이) 1833-6972 (www.kopico.go.kr)',
              },
              {
                title: '개인정보침해신고센터',
                text: '(국번없이) 118 (privacy.kisa.or.kr)',
              },
              {
                title: '대검찰청',
                text: '(국번없이) 1301 (www.spo.go.kr)',
              },
              {
                title: '경찰청',
                text: '(국번없이) 182 (ecrm.cyber.go.kr)',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제11조(개인정보 처리방침 변경)">
          <p>
            본 개인정보 처리방침은 {startDate.format('YYYY-MM-DD')}부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 앱 내 공지사항 또는 웹사이트를 통하여 고지할 것입니다.
          </p>
        </PrivacySection>
      </div>
    </main>
  );
}