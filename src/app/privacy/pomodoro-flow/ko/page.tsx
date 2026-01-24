import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/entities/privacy';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Page() {
  const startDate = dayjs('2026-01-24');
  const appName = 'Pomodoro Flow';

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <div className="flex gap-md justify-end">
          {[{ title: '🇺🇸 English', href: ROUTE_PATH.PRIVACY_POMODORO_FLOW_EN }].map(
            ({ title, href }) => (
              <Link
                key={title}
                href={href}
                className="py-xs px-sm rounded bg-app-sub-bg dark:bg-app-dark-sub-bg text-sm"
              >
                {title}
              </Link>
            ),
          )}
        </div>
        <h1 className="font-semibold text-2xl mb-md">개인정보 처리방침</h1>
        <p>시행일: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          본 개인정보 처리방침은 &lt;&lsquo;{appName}&rsquo;&gt; (이하 &quot;앱&quot;) (웹사이트:{' '}
          <Link
            className="text-app-primary dark:text-app-dark-primary underline"
            href={DEVELOPER.SITE_URL}
          >
            {DEVELOPER.SITE_URL}
          </Link>
          )이(가) 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
          하기 위하여 개인정보 보호법 제30조에 따라 수립·공개합니다.
        </p>

        <PrivacySection title="제1조 (개인정보의 처리목적)">
          <p>
            앱은 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리하고 있는 개인정보는
            다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 개인정보
            보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '서비스 제공',
                text: '뽀모도로 타이머, 집중 통계(차트), 세션 라벨링, 백그라운드 타이머/알림, 설정(테마/사운드) 기능 제공',
              },
              {
                title: '광고 제공 및 서비스 품질 유지',
                text: '맞춤형/일반 광고 표시(AdMob) 및 무료 서비스 운영 유지',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제2조 (수집 항목 및 수집 방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '수집 항목 (필수 - 광고 관련)',
                text: '모바일 광고 식별자(AAID/ADID 또는 iOS IDFA)',
                children: [
                  {
                    title: '광고 관련 이용 기록',
                    text: '광고 노출/클릭 로그 (AdMob SDK에 의해 수집)',
                  },
                  {
                    title: '기기 및 앱 정보',
                    text: 'OS 종류/버전, 기기 모델명, 앱 버전 등 (AdMob SDK에 의해 자동 수집)',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    광고 식별자는 기기별로 재설정 가능한 식별자이며, 이용자는 기기 설정에서 이를
                    재설정/삭제하거나 맞춤형 광고를 거부할 수 있습니다.
                  </div>
                ),
              },
              {
                title: '수집 방법',
                children: [
                  {
                    text: '앱 설치 및 이용 시 별도의 가입/로그인 절차 없이 Google AdMob SDK를 통해 자동 수집',
                  },
                ],
              },
              {
                title: '수집하지 않는 항목',
                text: '이름, 연락처, 위치정보 등 개인을 식별할 수 있는 정보는 앱에 의해 수집되지 않습니다. 타이머 데이터 및 설정은 기기에 로컬로 저장되며 외부 서버로 전송되지 않습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제3조 (처리 및 보유 기간)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '앱은 이용자의 식별 정보를 별도의 서버에 장기간 저장하지 않습니다. 광고 운영을 위한 데이터는 Google LLC (AdMob)의 보유 정책을 따릅니다.',
              },
              {
                title:
                  '앱 삭제 시 기기에 저장된 모든 데이터(타이머 기록, 설정 등)는 즉시 파기됩니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제4조 (개인정보의 제3자 제공)">
          앱은 원칙적으로 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령의 규정에 의거하거나,
          수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우 등 예외적인
          경우에는 제공될 수 있습니다.
        </PrivacySection>

        <PrivacySection title="제5조 (개인정보 처리 위탁 및 국외 이전)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '안정적인 서비스 제공을 위해 일부 개인정보 처리 업무를 외부에 위탁하고 있으며, 이에 따라 국외 이전이 발생할 수 있습니다.',
                children: [
                  { title: '수탁자/받는 자', text: 'Google LLC (AdMob)' },
                  { title: '국가', text: '미국' },
                  {
                    title: '일시/방법',
                    text: '앱 이용 시 네트워크를 통해 실시간 전송',
                  },
                  {
                    title: '이전 항목',
                    text: '광고 식별자(AAID/IDFA), 광고 이벤트 로그(노출/클릭), 기기/앱 정보',
                  },
                  { title: '목적', text: '광고 제공 및 운영' },
                  { title: '보유 기간', text: 'Google LLC 정책에 따름' },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제6조 (정보주체의 권리·의무 및 행사방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '쿠키(Cookie)',
                text: '본 앱은 모바일 앱이므로 쿠키를 사용하지 않습니다.',
              },
              {
                title: '광고 식별자(AAID/IDFA)',
                text: '광고 제공을 위해 사용됩니다.',
                children: [
                  {
                    title: 'Android',
                    text: '설정 > 개인정보 보호 > 광고 > 광고 ID 재설정/삭제, 광고 개인 최적화 선택 해제',
                  },
                  {
                    title: 'iOS',
                    text: '설정 > 개인정보 보호 및 보안 > 추적 > 앱이 추적을 요청하도록 허용',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제7조 (파기절차 및 파기방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '앱은 별도의 가입 서버를 운영하지 않으므로, 앱 삭제 시 사용자의 기기에 저장된 모든 데이터는 즉시 파기됩니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제8조 (안전성 확보 조치)">
          앱은 다음과 같은 조치를 취하고 있습니다:
          <PrivacyList
            items={[
              {
                text: '개인정보 수집 최소화, 광고 SDK 보안 설정 적용, 로컬 데이터 처리 원칙 준수(서버 미사용) 등',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제9조 (정보주체의 권리와 의무)">
          <PrivacyList
            items={[
              {
                text: '정보주체는 언제든지 개인정보 보호 관련 권리를 행사할 수 있습니다. 문의사항은 아래 개인정보 보호책임자에게 연락하시기 바랍니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제10조 (개인정보 보호책임자 및 연락처)">
          <PrivacyList
            items={[
              { title: '개인정보 보호책임자', text: 'TAEHONG KIM' },
              {
                title: '연락처',
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
              { title: '열람청구 접수·처리 부서', text: '위와 같음' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제11조 (권익침해 구제방법)">
          <PrivacyList
            items={[
              {
                text: '개인정보 침해로 인한 신고나 상담이 필요한 경우 각 국가의 개인정보 침해 신고 센터 등에 문의하실 수 있습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제12조 (외부 서비스와의 연동)">
          <p>
            앱은 광고 제공을 위해 Google LLC의 AdMob SDK를 사용합니다. 해당 제공자가 독립적으로
            개인정보를 수집/처리하는 경우 해당 사의 개인정보 처리방침이 적용됩니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제13조 (개인정보 처리방침 변경)">
          이 개인정보 처리방침은 {startDate.format('YYYY-MM-DD')}부터 적용됩니다. 법령 및 방침에
          따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 웹사이트 공지사항을 통하여 고지할
          것입니다.
        </PrivacySection>
      </div>
    </main>
  );
}
