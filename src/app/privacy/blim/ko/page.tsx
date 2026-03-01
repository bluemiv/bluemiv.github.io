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
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_BLIM_JP },
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
        <p>시행일자: {effectiveDate.format('YYYY-MM-DD')}</p>
        <p>
          본 개인정보 처리방침은 {companyName}(이하 &quot;회사&quot;)가 운영하는 {appName} 서비스에서
          개인정보를 어떻게 처리하는지 설명합니다. 회사는 서비스 제공·보안·운영에 필요한 범위에서만 개인정보를 처리합니다.
        </p>
        <p>
          사이트 주소:{' '}
          <Link className="text-app-primary dark:text-app-dark-primary underline" href={DEVELOPER.SITE_URL}>
            {DEVELOPER.SITE_URL}
          </Link>
        </p>

        <PrivacySection title="제1조(개인정보 처리 목적)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '계정 및 인증 관리',
                text: '로그인/게스트 연동, 계정 복구, 비정상 이용 방지',
              },
              {
                title: 'AI 채팅 서비스 제공',
                text: '캐릭터 응답 생성, 대화 맥락 유지, 채팅 세션 동기화',
              },
              {
                title: '지갑·결제·구독 처리',
                text: 'Google Play 결제/구독 검증, 보석 지급, 중복 지급 방지',
              },
              {
                title: '광고 및 리워드 운영',
                text: 'AdMob 광고 노출, 보상형 광고 횟수 제한·이력 관리',
              },
              {
                title: '안전 및 고객지원',
                text: '신고/문의 처리, 악용 탐지, 서비스 안정성 대응',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제2조(처리하는 개인정보 항목)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '계정 정보',
                text: '소셜 로그인 식별자, 이메일(제공 시), 프로필 표시 정보',
              },
              {
                title: '서비스 이용 정보',
                text: '채팅 메시지, 대화 요약, 캐릭터 진행정보(좋아요/카드 해금), 이용 메타데이터',
              },
              {
                title: '결제·구독 정보',
                text: 'Google Play 상품 ID, 주문/구매 토큰, 결제 상태, 지갑 거래 이력',
              },
              {
                title: '기술·보안 로그',
                text: 'IP, 기기/앱 버전, 세션 로그, 오류 로그, 부정 이용 탐지 정보',
              },
              {
                title: '광고 정보',
                text: '광고 식별자(AAID), 광고 이벤트 로그(노출/클릭 등)',
              },
              {
                title: '문의/건의 정보(선택)',
                text: '앱 내 문의 또는 이메일로 제출한 내용',
              },
              {
                title: '원칙적으로 수집하지 않는 항목',
                text: '주민등록번호 등 고유식별정보, 정밀 위치정보, 연락처/사진 원본',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제3조(개인정보 수집 방법)">
          <PrivacyList
            items={[
              { text: '로그인/결제 과정에서 인증 제공자 및 앱 마켓으로부터 제공받는 정보' },
              { text: '서비스 이용 과정에서 자동 생성·수집되는 정보' },
              { text: 'OpenAI, Supabase, Google Play, AdMob 등 연동 서비스/SDK를 통한 정보' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제4조(보유 및 이용 기간)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '계정 유지 중',
                text: '서비스 제공에 필요한 개인정보를 보유·이용합니다.',
              },
              {
                title: '탈퇴 후',
                text: '복구·분쟁·부정이용 대응을 위해 최대 30일간 마스킹/제한 보관 후 삭제할 수 있습니다.',
              },
              {
                title: '법령 보관',
                text: '전자상거래/세무 등 관련 법령에 따라 결제 기록 등 일부 정보는 별도 보관될 수 있습니다.',
              },
              {
                title: '보안 로그',
                text: '보안 사고 대응에 필요한 최소 기간 동안 보관 후 삭제합니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제5조(개인정보의 제3자 제공)">
          <p>
            회사는 개인정보를 판매하지 않습니다. 다만 법령 근거, 정보주체 동의, 권리·안전 보호를 위한
            경우 또는 서비스 운영에 필요한 범위에서만 제공합니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제6조(처리위탁 및 국외이전)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'Supabase, Inc. (미국)',
                text: '백엔드 인프라, 인증, 데이터베이스, 스토리지 운영',
              },
              {
                title: 'OpenAI, Inc. (미국)',
                text: '암호화된 API 전송을 통한 AI 응답 생성',
              },
              {
                title: 'Google LLC (미국)',
                text: 'Google Play 결제 검증 및 AdMob 광고 제공/성과 측정',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제7조(광고 식별자 및 거부 방법)">
          <PrivacyList
            items={[
              {
                title: 'Android',
                text: '설정 > 개인정보 보호 > 광고 > 광고 ID 재설정/삭제, 광고 맞춤설정 제한',
              },
              {
                text: '위 설정 시 맞춤형 광고는 제한될 수 있으나 일반 광고는 노출될 수 있습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제8조(정보주체의 권리 및 행사 방법)">
          <PrivacyList
            items={[
              { text: '정보주체는 열람·정정·삭제·처리정지 등 관련 법령상 권리를 행사할 수 있습니다.' },
              {
                text: (
                  <span>
                    앱 내 탈퇴 기능 또는 계정 삭제 안내 페이지{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href={ROUTE_PATH.ACCOUNT_DELETION_BLIM}
                    >
                      {ROUTE_PATH.ACCOUNT_DELETION_BLIM}
                    </Link>
                    를 통해 요청할 수 있습니다.
                  </span>
                ),
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제9조(아동의 개인정보 보호)">
          <p>
            미성년자 이용이 확인되는 경우 관련 법령 및 정책에 따라 계정 제한 또는 삭제 조치를 할 수 있습니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제10조(안전성 확보 조치)">
          <PrivacyList
            items={[
              { text: '전송구간 암호화(TLS/HTTPS), 접근권한 통제, 운영 로그/감사 체계 적용' },
              { text: '서버 시크릿 분리·관리 및 민감 작업의 서버측 검증' },
              { text: '비정상 트래픽 및 부정 결제/남용 탐지 모니터링' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제11조(처리방침 변경)">
          <p>
            법령 또는 서비스 변경으로 처리방침이 수정될 수 있으며, 중요한 변경은 시행 전 앱 내 공지
            또는 웹사이트를 통해 안내합니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제12조(문의처)">
          <PrivacyList
            items={[
              { title: '사업자', text: companyName },
              {
                title: '이메일',
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
