import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/entities/privacy';
import { DEVELOPER } from '@/features/privacy';

export default function Page() {
  const startDate = dayjs('2026-02-07');
  const appName = 'Blim';

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <h1 className="font-semibold text-2xl mb-md">개인정보 처리방침</h1>
        <p>시행일자: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          본 개인정보 처리방침은 &lt;&lsquo;{appName}&rsquo;&gt;(이하 &quot;본
          앱&quot;)(사이트주소:{' '}
          <Link
            className="text-app-primary dark:text-app-dark-primary underline"
            href={DEVELOPER.SITE_URL}
          >
            {DEVELOPER.SITE_URL}
          </Link>
          )가 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 관련 민원을 신속하고
          원활하게 처리하기 위하여 수립·공개하는 것입니다.
        </p>

        <PrivacySection title="제1조(처리 목적)">
          <p>
            본 앱은 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 명시된 목적 외의 용도로는
            이용하지 않으며, 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도 동의를
            받는 등 필요한 조치를 이행합니다.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '서비스 제공 및 이용자 식별',
                text: '소셜 로그인을 통한 회원 식별, AI 캐릭터 채팅 서비스 제공, 대화 맥락 유지 및 개인화된 장기 기억(RAG) 서비스 제공',
              },
              {
                title: '서비스 운영 및 부정 이용 방지',
                text: '접속 로그 분석을 통한 서비스 안정성 확보, 부정 이용 탐지 및 차단',
              },
              {
                title: '유료 결제 처리',
                text: '인앱 결제(베리) 처리 및 구매 내역 관리',
              },
              {
                title: '광고 제공',
                text: '맞춤형·표준형 광고 노출(AdMob), 서비스 무료 운영 목적',
              },
              {
                title: '마케팅(선택)',
                text: '신규 캐릭터 출시, 갤러리 업데이트, 이벤트 알림 등 광고성 정보 전송',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제2조(수집 항목 및 수집 방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '수집 항목(필수)',
                children: [
                  {
                    title: '회원가입 시',
                    text: '소셜 로그인 식별값(UID), 닉네임, 생년, 성별',
                  },
                  {
                    title: '서비스 이용 시',
                    text: 'AI와의 대화 로그(메시지 텍스트), 대화 요약 데이터',
                  },
                  {
                    title: '자동 수집',
                    text: '접속 IP, 쿠키, 기기 정보(운영체제, 단말기 모델, 앱 버전), 모바일 광고 식별자(AAID/IDFA), 광고 이벤트 로그(AdMob SDK)',
                  },
                  {
                    title: '결제 시',
                    text: '결제 기록(구매 항목, 일시, 금액), 앱 마켓 거래 ID',
                  },
                ],
              },
              {
                title: '수집 항목(선택 — 마케팅 동의 시)',
                text: '닉네임, 앱 푸시 토큰',
              },
              {
                title: '수집 방법',
                children: [
                  {
                    text: '소셜 로그인(Google, Apple 등) 시 제공받는 정보, 서비스 이용 과정에서 자동 생성·수집되는 정보, Google AdMob SDK를 통해 자동 수집되는 정보',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제3조(보유 및 이용 기간)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '원칙',
                text: '이용자의 개인정보는 회원 탈퇴 시까지 보유합니다.',
              },
              {
                title: '탈퇴 후 보관',
                text: '부정 이용 방지 및 복구 대응을 위해 탈퇴 후 30일간 데이터를 마스킹하여 보관한 뒤 지체 없이 파기합니다.',
              },
              {
                title: '법령에 따른 보존',
                children: [
                  {
                    text: '전자상거래법에 따른 결제 기록: 5년',
                  },
                  {
                    text: '통신비밀보호법에 따른 접속 로그: 3개월',
                  },
                ],
              },
              {
                title: '광고 데이터',
                text: '광고 운영 목적 데이터는 Google LLC(AdMob)의 보관기간 정책에 따릅니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제4조(개인정보의 제3자 제공)">
          본 앱은 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 근거가
          있거나 정보주체의 별도 동의를 받은 경우에 한하여 제공할 수 있습니다.
        </PrivacySection>

        <PrivacySection title="제5조(처리 위탁 및 국외 이전)">
          <p>
            본 앱은 서비스 제공을 위해 개인정보 처리 업무의 일부를 외부에 위탁하며, 수탁자가 국외에
            위치한 경우 국외 이전이 발생합니다.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: 'AI 응답 생성 (OpenAI)',
                children: [
                  { title: '수탁자/이전받는 자', text: 'OpenAI, Inc.' },
                  { title: '이전 국가', text: '미국' },
                  {
                    title: '이전 일시 및 방법',
                    text: '대화 발생 시 API 호출을 통해 실시간 전송',
                  },
                  {
                    title: '이전 항목',
                    text: '이용자가 입력한 대화 메시지 텍스트',
                  },
                  {
                    title: '이용 목적',
                    text: '인공지능(AI) 모델을 통한 캐릭터 응답 생성',
                  },
                  {
                    title: '보유·이용 기간',
                    text: 'OpenAI 데이터 처리 정책에 따르며, 목적 달성 시 파기',
                  },
                ],
              },
              {
                title: '광고 제공 (Google AdMob)',
                children: [
                  { title: '수탁자/이전받는 자', text: 'Google LLC(AdMob)' },
                  { title: '이전 국가', text: '미국' },
                  {
                    title: '이전 일시 및 방법',
                    text: '앱 사용 시점마다 네트워크를 통한 실시간 전송',
                  },
                  {
                    title: '이전 항목',
                    text: '광고 식별자(AAID/IDFA), 광고 이벤트 로그(노출/클릭 등), 기기·앱 정보',
                  },
                  { title: '이용 목적', text: '광고 제공 및 운영' },
                  { title: '보유·이용 기간', text: 'Google LLC 정책에 따름' },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제6조(자동 수집 장치의 설치·운영 및 거부)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '쿠키',
                text: '본 앱은 서비스 운영 및 인증 유지를 위해 쿠키를 사용할 수 있습니다.',
              },
              {
                title: '광고 식별자(AAID/IDFA)',
                text: '광고 제공을 위해 사용됩니다.',
                children: [
                  {
                    title: 'Android',
                    text: '설정 > 개인정보 보호 > 광고 > 광고 ID 재설정/삭제, 맞춤형 광고 제한 설정 가능',
                  },
                  {
                    title: 'iOS',
                    text: '설정 > 개인정보 보호 및 보안 > 추적 > 앱이 추적을 요청하도록 허용 설정 관리',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제7조(개인정보의 파기 절차 및 방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '파기 절차',
                text: '이용자가 회원 탈퇴를 요청하면 30일간 마스킹 보관 후 지체 없이 파기합니다. 법령에 의해 보존이 필요한 경우 별도 분리 보관 후 기간 만료 시 파기합니다.',
              },
              {
                title: '파기 방법',
                children: [
                  {
                    title: '전자적 파일',
                    text: '복구·재생이 불가능한 기술적 방법으로 영구 삭제',
                  },
                  { title: '출력물', text: '분쇄 또는 소각' },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제8조(개인정보의 안전성 확보 조치)">
          본 앱은 「개인정보의 안전성 확보조치 기준」을 준수하기 위해 다음과 같은 조치를 취합니다.
          <PrivacyList
            items={[
              {
                text: '접근권한 관리(Supabase Row Level Security 적용), 데이터 전송 구간 암호화(HTTPS/TLS), 비밀번호 미저장(소셜 로그인 위임), 접속기록 보관 및 위·변조 방지, 정기 점검',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제9조(정보주체의 권리·의무 및 행사 방법)">
          <PrivacyList
            items={[
              {
                text: '정보주체는 언제든지 개인정보의 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.',
              },
              {
                text: '앱 내 회원 탈퇴 기능을 통해 직접 삭제를 요청할 수 있으며, 기타 권리 행사는 아래 개인정보 보호책임자에게 서면, 이메일 등으로 신청하실 수 있습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제10조(개인정보 보호책임자 및 열람청구 창구)">
          <PrivacyList
            items={[
              { title: '개인정보 보호책임자', text: '김태홍 (베리파이 대표)' },
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
              { title: '열람청구 접수·처리 담당', text: '동일' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제11조(권익침해 구제 방법)">
          <PrivacyList
            items={[
              {
                text: '개인정보 침해에 대한 상담·분쟁조정을 원하시는 경우 아래 기관에 문의할 수 있습니다.',
              },
              {
                title: '개인정보분쟁조정위원회',
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
                title: '개인정보침해신고센터(한국인터넷진흥원)',
                text: (
                  <span>
                    국번없이 118,{' '}
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
                title: '대검찰청',
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
                title: '경찰청 사이버범죄신고',
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

        <PrivacySection title="제12조(외부 서비스와의 연동)">
          <PrivacyList
            items={[
              {
                text: '본 앱은 AI 응답 생성을 위해 OpenAI, Inc.의 API를 사용하며, 광고 제공을 위해 Google LLC의 AdMob SDK를 사용합니다. 해당 사업자가 자체적으로 개인정보를 수집·처리하는 경우, 해당 사업자의 처리방침이 적용됩니다.',
              },
              {
                text: '소셜 로그인(Google, Apple 등)을 통해 제공되는 정보는 각 플랫폼의 개인정보 처리방침에 따릅니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제13조(개인정보 처리방침의 변경)">
          본 방침은 {startDate.format('YYYY-MM-DD')}부터 적용됩니다. 법령, 서비스 내용 변경 등이
          있을 경우 앱 내 공지 또는 웹사이트를 통해 변경사항과 시행일자를 안내합니다.
        </PrivacySection>
      </div>
    </main>
  );
}
