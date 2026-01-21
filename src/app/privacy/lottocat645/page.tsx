import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/entities/privacy';
import { DEVELOPER } from '@/features/privacy';

export default function Page() {
  const startDate = dayjs('2025-09-09');
  const appName = '로또켓645';

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
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
          원활하게 처리하기 위하여 수립·공개하는 것입니다. {appName}는 동행복권에서 제공하는 공개
          자료를 바탕으로 서비스 기능을 제공합니다.
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
                text: '로또 6/45 회차별 당첨 번호 조회, 번호 추천(스마트/가중치/역가중치), 통계 분석, 생성 내역 및 즐겨찾기 기능 제공',
              },
              {
                title: '광고 제공 및 서비스 품질 유지',
                text: '맞춤형·표준형 광고 노출(AdMob), 부정 클릭 방지 등 광고 운영 목적',
              },
            ]}
          />
          <div className="mt-sm text-sm opacity-80">
            ※ {appName}는 동행복권 및 관계사와 무관한 비공식 정보 제공 앱이며, 구매/당첨을 보장하지
            않습니다.
          </div>
        </PrivacySection>

        <PrivacySection title="제2조(수집 항목 및 수집 방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '수집 항목(필수)',
                text: '모바일 광고 식별자(AAID/ADID 또는 iOS IDFA)',
                children: [
                  {
                    title: '광고 관련 이용 기록',
                    text: '광고 노출/클릭 등 광고 이벤트 로그(AdMob SDK 수집)',
                  },
                  {
                    title: '기기·앱 정보',
                    text: '운영체제 종류/버전, 단말기 모델, 앱 버전 등(AdMob SDK 자동 수집 가능)',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    광고 식별자는 단말기별 재설정 가능한 식별자이며, 단말 설정에서 재설정·삭제 또는
                    맞춤형 광고 제한이 가능합니다.
                  </div>
                ),
              },
              {
                title: '수집 방법',
                children: [
                  {
                    text: '회원가입·로그인 절차 없이 앱 설치 및 사용 시 Google AdMob SDK를 통해 자동 수집됩니다.',
                  },
                ],
              },
              {
                title: '수집하지 않는 항목',
                text: '이름, 연락처, 위치정보 등 직접 식별 가능한 개인정보는 앱 차원에서 수집하지 않습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제3조(보유 및 이용 기간)">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '{appName}는 별도 서버를 통해 이용자 식별정보를 장기간 저장하지 않습니다. 광고 운영 목적 데이터는 Google LLC(AdMob)의 보관기간 설정 및 정책에 따릅니다.',
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
                text: '안정적 서비스 제공을 위해 개인정보 처리 업무의 일부를 외부에 위탁하며, 수탁자가 국외에 위치한 경우 국외 이전이 발생할 수 있습니다. 위탁계약 체결 시 개인정보 보호 관련 법령을 준수합니다.',
                children: [
                  { title: '수탁자/이전받는 자', text: 'Google LLC(AdMob)' },
                  { title: '이전 국가', text: '미국' },
                  {
                    title: '이전 일시 및 방법',
                    text: '앱 사용 시점마다 네트워크를 통한 실시간 전송',
                  },
                  {
                    title: '이전 항목',
                    text: '광고 식별자(AAID/IDFA), 광고 이벤트 로그(노출/클릭 등), 기기·앱 정보(운영체제, 단말기 모델, 앱 버전 등)',
                  },
                  { title: '이용 목적', text: '광고 제공 및 운영' },
                  { title: '보유·이용 기간', text: '제3조 및 Google LLC 정책에 따름' },
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
              { title: '쿠키', text: '{appName}는 모바일 앱 특성상 쿠키를 사용하지 않습니다.' },
              {
                title: '광고 식별자(AAID/IDFA)',
                text: '광고 제공을 위해 사용됩니다.',
                children: [
                  {
                    title: 'Android',
                    text: '설정 &gt; 개인정보 보호 &gt; 광고 &gt; 광고 ID 재설정/삭제, 맞춤형 광고 제한 설정 가능',
                  },
                  {
                    text: '(iOS의 경우에도 설정에서 추적 허용 여부를 관리할 수 있습니다.) 설정 변경 시 맞춤형 광고가 제한되거나 식별자가 재설정/삭제될 수 있습니다.',
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
                text: '내부관리계획 수립·시행, 접근권한 관리, 접속기록 보관 및 위·변조 방지, 암호화 적용(가능한 경우), 악성코드 방지 및 보안 프로그램 적용, 정기 점검 및 교육 등',
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

        <PrivacySection title="제12조(데이터 출처 및 고지)">
          <p className="mb-sm">
            본 앱은 <strong>동행복권</strong>에서 공개하는 자료(예: 회차별 당첨 번호)를 바탕으로
            정보를 제공합니다. 공식 발표와 앱 표시 간 지연·오차가 발생할 수 있으며, 상이한 경우{' '}
            <strong>동행복권의 공식 발표</strong>를 기준으로 합니다.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>동행복권과의 제휴·후원 관계가 아니며, 비공식 정보 제공 앱입니다.</li>
            <li>당첨 가능성을 보장하지 않으며, 구매·투자는 이용자 본인의 책임입니다.</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="제13조(외부 서비스와의 연동)">
          <p>
            본 앱은 광고 제공을 위해 Google LLC의 AdMob SDK를 사용합니다. 해당 사업자가 자체적으로
            개인정보를 수집·처리하는 경우, 해당 사업자의 처리방침이 적용됩니다.
          </p>
        </PrivacySection>

        <PrivacySection title="제14조(개인정보 처리방침의 변경)">
          본 방침은 {startDate.format('YYYY-MM-DD')}부터 적용됩니다. 법령, 서비스 내용, 수탁자 변경
          등이 있을 경우 웹사이트 공지 등을 통해 변경사항과 시행일자를 안내합니다.
        </PrivacySection>
      </div>
    </main>
  );
}
