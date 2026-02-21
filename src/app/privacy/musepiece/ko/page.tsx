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
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_MUSEPIECE_JP },
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
          본 개인정보 처리방침은 &lt;{companyName}&gt;가 운영하는 &lt;{appName}&gt;(이하 &quot;본
          앱&quot;)에서 정보주체의 개인정보를 보호하고 관련 문의를 원활히 처리하기 위해 관련 법령에
          따라 수립·공개하는 방침입니다.
        </p>

        <PrivacySection title="제1조(개인정보 처리 목적)">
          <p>본 앱은 다음 목적 범위에서 최소한의 정보만 처리합니다.</p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '게임 기능 제공',
                text: '퍼즐 플레이, 갤러리 해금, 재화, 설정/환경값 저장 및 복원',
              },
              {
                title: '광고 제공 및 무료 서비스 운영',
                text: 'Google AdMob 광고 노출 및 보상형 광고 결과 처리',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제2조(처리 항목 및 수집 방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '기기 내부(로컬)에 저장되는 항목',
                children: [
                  { text: '퍼즐 진행도(클리어 상태, 이동/시간 기록, 별, 해금 상태)' },
                  { text: '재화 및 보상형 광고 상태(일일 제한/쿨다운 상태 포함)' },
                  { text: '앱 설정(언어, 배경음악 on/off 등)' },
                ],
              },
              {
                title: '광고 SDK(AdMob) 자동 수집 항목',
                children: [
                  {
                    title: '광고 식별자',
                    text: 'AAID/ADID(Android) 또는 IDFA(iOS)',
                  },
                  {
                    title: '광고 이벤트 로그',
                    text: '광고 노출/클릭/보상 완료 이벤트',
                  },
                  {
                    title: '기기/앱 정보',
                    text: '운영체제·버전, 단말기 모델, 앱 버전 등 기술 정보',
                  },
                ],
              },
              {
                title: '수집 방법',
                text: '앱 이용 과정에서 앱 로직 및 Google AdMob SDK를 통해 자동 수집·처리됩니다.',
              },
              {
                title: '앱이 직접 수집하지 않는 항목',
                text: '본 앱은 회원가입을 요구하지 않으며, 이름·전화번호·정밀 위치정보 등 직접 식별정보를 앱 차원에서 수집하지 않습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제3조(보유 및 이용 기간)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '본 앱은 이용자 계정용 별도 백엔드를 운영하지 않으며, 게임/설정 데이터는 기기 내부에 저장됩니다.',
              },
              {
                text: '앱 삭제 시 기기에 저장된 로컬 데이터는 함께 삭제됩니다.',
              },
              {
                text: 'AdMob을 통해 처리되는 광고 관련 데이터는 Google LLC 정책에 따릅니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제4조(개인정보의 제3자 제공)">
          <p>
            본 앱은 법령상 근거가 있는 경우를 제외하고, 이용자 개인정보를 제3자에게 제공하지
            않습니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제5조(처리 위탁 및 국외 이전)">
          <PrivacyList
            items={[
              { title: '수탁자/이전받는 자', text: 'Google LLC (AdMob)' },
              { title: '이전 국가', text: '미국' },
              {
                title: '이전 시점/방법',
                text: '광고 요청 시 네트워크를 통한 실시간 전송',
              },
              {
                title: '이전 항목',
                text: '광고 식별자, 광고 이벤트 로그, 기기/앱 정보',
              },
              { title: '이용 목적', text: '광고 제공 및 성과 처리' },
              { title: '보유·이용 기간', text: 'Google LLC 정책에 따름' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제6조(정보주체 권리 및 행사 방법)">
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: '설정 > 개인정보 보호 > 광고 > 광고 ID 재설정/삭제, 맞춤형 광고 제한',
              },
              {
                title: 'iOS',
                text: '설정 > 개인정보 보호 및 보안 > 추적 > 앱 추적 허용 해제',
              },
              {
                text: '맞춤형 광고를 제한해도 일반 광고는 노출될 수 있습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제7조(개인정보 파기)">
          <p>본 앱은 로컬 저장 중심 구조이며, 앱 삭제 시 기기 내 게임 데이터가 함께 파기됩니다.</p>
        </PrivacySection>

        <PrivacySection title="제8조(안전성 확보 조치)">
          <PrivacyList
            items={[
              {
                text: '최소 수집 원칙, 로컬 우선 저장, 외부 SDK 보안 설정 적용 등 안전성 확보 조치를 수행합니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제9조(개인정보 보호 관련 문의)">
          <PrivacyList
            items={[
              { title: '담당자', text: 'TAEHONG KIM' },
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
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제10조(외부 서비스 연동)">
          <PrivacyList
            items={[
              {
                title: 'Google AdMob',
                text: '배너/보상형 광고 제공을 위해 사용됩니다.',
              },
              {
                title: 'Google Play 인앱 리뷰',
                text: '앱 내 리뷰 요청 UI가 표시될 수 있으며, 리뷰 작성 및 관련 데이터 처리는 앱 마켓 사업자 정책을 따릅니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제11조(개인정보 처리방침 변경)">
          <p>
            본 방침은 {startDate.format('YYYY-MM-DD')}부터 적용됩니다. 법령 또는 서비스 변경에 따라
            내용이 변경되는 경우, 본 페이지를 통해 고지합니다.
          </p>
        </PrivacySection>
      </div>
    </main>
  );
}
