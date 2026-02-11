import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/features/privacy';
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
            { title: '🇺🇸 English', href: ROUTE_PATH.PRIVACY_KPOP_EN },
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_KPOP_JP },
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
        <h1 className="font-semibold text-2xl mb-md">개인정보 처리방침</h1>
        <p>시행일자: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          본 개인정보 처리방침은 &lt;&lsquo;{appName}&rsquo;&gt;(사이트주소:{' '}
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
            {appName}는 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 명시된 목적 외의
            용도로는 이용하지 않으며, 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라
            별도 동의를 받는 등 필요한 조치를 이행합니다.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '콘텐츠 제공',
                text: '특정 가수의 유튜브 영상 보기 기능, 인터넷에 공개된 사진을 앱 내에서 다운로드할 수 있는 기능 제공',
              },
              {
                title: '광고 제공 및 통계·품질 개선',
                text: '맞춤형 광고 노출, 부정 클릭 방지, 앱 사용성 분석(GA4) 및 서비스 품질 개선',
              },
            ]}
          />
        </PrivacySection>
        <PrivacySection title="제2조(수집 항목 및 수집 방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '수집 항목(필수) 모바일 광고 식별자',
                text: 'Android Advertising ID(AAID/ADID) 또는 iOS IDFA',
                children: [
                  {
                    title: '광고·분석 관련 이용 기록',
                    text: '광고 노출/클릭, 화면 조회, 버튼 클릭 등 이벤트 로그 기기 및 앱',
                  },
                  {
                    title: '정보',
                    text: '운영체제 종류/버전, 단말기 모델, 앱 버전 등(분석 SDK가 자동 수집 가능)',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    광고 식별자는 단말기별로 재설정 가능한 식별자이며, 사용자는 단말 설정에서
                    재설정·삭제 또는 맞춤형 광고 제한이 가능합니다.
                  </div>
                ),
              },
              {
                title: '수집 방법',
                children: [
                  {
                    text: '회원가입·로그인 절차 없이 앱 설치 및 사용 시 모바일 SDK(예: Google AdMob, GA4)를 통해 자동 수집됩니다.',
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
                text: '{appName}는 별도 서버를 운영하여 이용자의 식별정보를 장기간 저장하지 않으며, 광고·분석 목적의 데이터는 해당 SDK 사업자의 보관기간 설정과 정책에 따릅니다.',
              },
              {
                title: 'GA4 보관기간',
                text: '관리자가 2개월 또는 14개월 중에서 선택할 수 있으며, Google-signals 데이터는 설정과 무관하게 최대 26개월 보관됩니다.',
              },
              {
                title:
                  '목적 달성 또는 보관기간 경과 시 지체 없이 파기하거나, 법령에 따라 필요한 경우 별도 분리 보관합니다.',
              },
            ]}
          />
        </PrivacySection>
        <PrivacySection title="제4조(개인정보의 제3자 제공)">
          {appName}는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에
          근거가 있거나 정보주체의 별도 동의를 받은 경우에 한하여 제공할 수 있습니다.
        </PrivacySection>

        <PrivacySection title="제5조(처리 위탁 및 국외 이전)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '{appName}는 안정적 서비스 제공을 위해 개인정보 처리 업무의 일부를 외부에 위탁하며, 수탁자가 국외에 위치한 경우 국외 이전이 발생할 수 있습니다. 위탁계약 체결 시 개인정보 보호 관련 법령을 준수합니다.',
                children: [
                  { title: '수탁자/이전받는 자', text: 'Google LLC(AdMob, Google Analytics)' },
                  { title: '이전 국가', text: '미국' },
                  {
                    title: '이전 일시 및 방법',
                    text: '앱 사용 시점마다 네트워크를 통한 실시간 전송',
                  },
                  {
                    title: '이전 항목',
                    text: '광고 식별자(AAID/IDFA), 이용기록(광고 노출/클릭, 이벤트 로그 등), 기기·앱 정보(운영체제, 단말기 모델, 앱 버전 등)',
                  },
                  { title: '이용 목적', text: '광고 제공, 통계 분석, 서비스 품질 개선' },
                  { title: '보유·이용 기간', text: '제3조 및 각 수탁자 정책에 따름' },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    (참고) Android의 광고 식별자는 사용자가 재설정/삭제 및 맞춤형 광고 제한을 설정할
                    수 있습니다.
                  </div>
                ),
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
                text: '{appName}는 모바일 앱 서비스 특성상 쿠키를 사용하지 않습니다.',
              },
              {
                title: '광고 식별자(AAID/IDFA)',
                text: '광고 제공 및 분석을 위해 사용됩니다.',
                children: [
                  {
                    title: 'Android',
                    text: '설정 > 개인정보 보호 > 광고 > 광고 ID 재설정/삭제, 맞춤형 광고 제한 설정 가능',
                  },
                  {
                    text: '(iOS의 경우에도 설정에서 추적 허용 여부를 관리할 수 있습니다.) 위 설정을 변경하면 맞춤형 광고 노출이 제한되거나 관련 식별자가 재설정/삭제될 수 있습니다.',
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
              { text: '파기 사유 발생 시 지체 없이 파기합니다.' },
              { title: '전자적 파일', text: '복구·재생이 불가능한 기술적 방법으로 영구 삭제' },
              { title: '출력물', text: '분쇄 또는 소각' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제8조(개인정보의 안전성 확보 조치)">
          {appName}는 「개인정보의 안전성 확보조치 기준」을 준수하기 위해 다음과 같은 조치를
          취합니다.
          <PrivacyList
            items={[
              {
                text: '내부관리계획 수립·시행, 접근권한 관리, 접속기록 보관 및 위·변조 방지, 암호화 적용(가능한 경우), 악성코드 방지 및 보안 프로그램 적용, 정기 점검 및 교육 등.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제9조(정보주체의 권리·의무 및 행사 방법)">
          <PrivacyList
            items={[
              {
                text: '정보주체는 {appName}에 대해 언제든지 열람·정정·삭제·처리정지 요구 등을 행사할 수 있습니다. 대리인을 통한 행사도 가능합니다(별지 제11호 서식 위임장).',
              },
              {
                text: '권리 행사는 서면, 이메일, 팩스 등으로 신청하실 수 있으며, {appName}는 지체 없이 조치합니다.',
              },
              {
                text: '법령에 따라 열람 제한 또는 처리정지 거절 사유가 존재하는 경우 관련 규정에 따릅니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제10조(개인정보 보호책임자 및 열람청구 창구)">
          <PrivacyList
            items={[
              { title: '개인정보 보호책임자', text: '김태홍 (직책/직급: 없음)' },
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
          앱은 유튜브 영상 링크/플레이어를 통해 콘텐츠를 제공합니다. 유튜브 또는 외부 플랫폼이
          자체적으로 개인정보를 수집·처리하는 경우, 해당 사업자의 처리방침이 적용되며 세부 내용은 각
          사업자의 정책을 확인하시기 바랍니다.
        </PrivacySection>

        <PrivacySection title="제13조(개인정보 처리방침의 변경)">
          본 방침은 {startDate.format('YYYY-MM-DD')}부터 적용됩니다. 법령, 서비스 내용, 수탁자 변경
          등이 있을 경우 웹사이트 공지 등을 통해 변경사항과 시행일자를 안내합니다.
        </PrivacySection>
      </div>
    </main>
  );
}
