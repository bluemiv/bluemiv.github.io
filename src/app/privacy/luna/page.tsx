import dayjs from 'dayjs';
import Link from 'next/link';
import { DEVELOPER, PrivacyList, PrivacySection } from '@/features/privacy';

export default function Page() {
  const startDate = dayjs('2026-02-13');
  const appName = 'Luna 타로: AI 오늘의 운세';

  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8">
        <h1 className="font-semibold text-2xl mb-md">개인정보 처리방침</h1>
        <p>시행일자: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          본 개인정보 처리방침은 &lt;&lsquo;{appName}&rsquo;&gt;(이하 &quot;본 앱&quot;)(사이트주소:{' '}
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
                title: '타로 리딩 서비스 제공',
                text: '카드 선택 결과 및 사용자의 질문(선택 입력)을 기반으로 AI 해석 결과를 제공',
              },
              {
                title: '리워드 기반 이용권한 검증',
                text: '광고 시청 서버 검증(SSV) 및 AI 호출 크레딧 적립/차감 처리',
              },
              {
                title: '서비스 운영 및 안정성 확보',
                text: '비정상 이용 방지, 장애 대응, 서비스 품질 개선',
              },
              {
                title: '광고 제공',
                text: 'Google AdMob을 통한 배너/리워드 광고 노출',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제2조(수집 항목 및 수집 방법)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '앱 내 로컬 저장 항목(기기 내부 저장)',
                children: [
                  {
                    text: '프로필 선택값(닉네임, 생년, 별자리)'
                  },
                  {
                    text: '타로 리딩 기록(카드, 방향, 해석 결과, 생성 시각)'
                  },
                  {
                    text: '스트릭/설정 정보(알림 설정 등)'
                  },
                ],
              },
              {
                title: '서버 처리 항목(Supabase/OpenAI 연계)',
                children: [
                  {
                    text: '익명 인증 식별자(Supabase Anonymous User ID)'
                  },
                  {
                    text: '리딩 요청 데이터(cardId, orientation, topic, userContext(선택))'
                  },
                  {
                    text: '리워드 검증 데이터(transaction_id, user_id, reward_amount, 광고 메타데이터)'
                  },
                ],
              },
              {
                title: '광고 SDK 자동 수집 항목(AdMob)',
                children: [
                  {
                    text: '광고 식별자(AAID/ADID 또는 iOS IDFA)'
                  },
                  {
                    text: '광고 이벤트 로그(노출/클릭/보상 이벤트)'
                  },
                  {
                    text: '기기/앱 정보(운영체제, 단말기 모델, 앱 버전 등)'
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    광고 식별자는 단말기 설정에서 재설정/삭제하거나 맞춤형 광고를 제한할 수 있습니다.
                  </div>
                ),
              },
              {
                title: '수집 방법',
                children: [
                  { text: '앱 이용 과정에서 이용자 입력 및 기능 수행 시 자동/수동 수집' },
                  { text: 'Google AdMob SDK 및 Supabase/OpenAI API 연동 과정에서 네트워크를 통한 처리' },
                ],
              },
              {
                title: '수집하지 않는 항목',
                text: '주민등록번호, 여권번호, 운전면허번호, 신용카드번호, 정밀 위치정보, 연락처/주소록 등 민감·고유식별 정보는 수집하지 않습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제3조(보유 및 이용 기간)">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '로컬 데이터',
                text: '기기에 저장되며, 사용자가 앱을 삭제하면 함께 삭제됩니다.',
              },
              {
                title: '서버 데이터(익명 인증/크레딧 검증)',
                text: '서비스 운영 및 부정 이용 방지 목적 범위 내에서 필요한 기간 동안 보관하며, 이용자의 삭제 요청 또는 서비스 종료 시 지체 없이 파기합니다.',
              },
              {
                title: '광고/외부 사업자 데이터',
                text: 'Google LLC(AdMob), OpenAI, Supabase의 각 정책 및 관련 법령에서 정한 기간에 따릅니다.',
              },
              {
                title: '법령에 따른 보관',
                text: '관련 법령에서 일정 기간 보관 의무를 부과하는 경우, 해당 기간 동안 별도로 분리 보관할 수 있습니다.',
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
            본 앱은 서비스 제공을 위해 개인정보 처리 업무의 일부를 외부 서비스 제공자에게 위탁하며,
            해당 제공자가 국외에 위치한 경우 국외 이전이 발생할 수 있습니다.
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '광고 제공',
                children: [
                  { title: '수탁자/이전받는 자', text: 'Google LLC (AdMob)' },
                  { title: '이전 국가', text: '미국' },
                  {
                    title: '이전 항목',
                    text: '광고 식별자, 광고 이벤트 로그, 기기/앱 정보',
                  },
                  { title: '목적', text: '광고 제공 및 성과 측정' },
                ],
              },
              {
                title: 'AI 해석 생성',
                children: [
                  { title: '수탁자/이전받는 자', text: 'OpenAI, LLC(또는 OpenAI API 제공 주체)' },
                  { title: '이전 국가', text: '미국 등(OpenAI 인프라 운영 지역)' },
                  {
                    title: '이전 항목',
                    text: '카드 정보(cardId, orientation, topic), 사용자 질문(userContext, 선택)',
                  },
                  { title: '목적', text: 'AI 타로 해석 생성' },
                ],
              },
              {
                title: '백엔드/인증/DB',
                children: [
                  { title: '수탁자/이전받는 자', text: 'Supabase, Inc.' },
                  { title: '이전 국가', text: '미국 등(Supabase 인프라 운영 지역)' },
                  {
                    title: '이전 항목',
                    text: '익명 사용자 식별자, 리워드 검증/크레딧 처리 데이터',
                  },
                  { title: '목적', text: '익명 인증, 리워드 검증, 크레딧 관리' },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제6조(자동 수집 장치의 설치·운영 및 거부)">
          <PrivacyList
            type="ol"
            items={[
              { title: '쿠키', text: '모바일 앱 특성상 일반 웹 쿠키를 사용하지 않습니다.' },
              {
                title: '광고 식별자(AAID/IDFA)',
                text: '광고 제공을 위해 사용되며, 이용자는 아래와 같이 제한할 수 있습니다.',
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
                text: '처리 목적이 달성되었거나 보유기간이 경과한 개인정보는 지체 없이 파기합니다.',
              },
              {
                title: '파기 방법',
                children: [
                  { title: '전자적 파일', text: '복구·재생이 불가능한 방식으로 영구 삭제' },
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
                text: '전송 구간 암호화(HTTPS/TLS), 접근권한 최소화, 서버 비밀키 분리 관리, 로그 모니터링 및 취약점 점검',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제9조(정보주체의 권리·의무 및 행사 방법)">
          <PrivacyList
            items={[
              {
                text: '정보주체는 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있습니다.',
              },
              {
                text: '익명 식별자 기반 서비스 특성상 본인 확인을 위한 추가 정보가 필요할 수 있으며, 관련 요청은 아래 연락처로 접수할 수 있습니다.',
              },
              {
                text: '삭제 요청 시 처리 정확성을 위해 앱의 익명 사용자 식별자(Supabase Anonymous User ID), 사용 기기 정보, 요청 시점을 함께 전달해 주시기 바랍니다.',
              },
              {
                text: '정보주체는 관련 법령에 따라 권리 행사가 일부 제한될 수 있으며, 정당한 사유가 있는 경우 처리 결과를 통지받을 수 있습니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제10조(개인정보 보호책임자 및 열람청구 창구)">
          <PrivacyList
            items={[
              { title: '개인정보 보호책임자', text: '김태홍' },
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
                text: '본 앱은 광고 제공을 위해 Google AdMob SDK를, AI 해석 생성을 위해 OpenAI API를, 익명 인증 및 리워드 검증 데이터 처리를 위해 Supabase를 사용합니다.',
              },
              {
                text: '각 외부 서비스 사업자가 독립적으로 개인정보를 처리하는 경우 해당 사업자의 개인정보 처리방침이 적용됩니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제13조(아동의 개인정보 보호)">
          <PrivacyList
            items={[
              {
                text: '본 앱은 만 14세 미만 아동을 주요 대상으로 하지 않으며, 만 14세 미만 아동의 개인정보를 고의로 수집하지 않습니다.',
              },
              {
                text: '만 14세 미만 아동의 개인정보가 수집된 사실을 인지한 경우, 지체 없이 해당 정보를 삭제하는 등 필요한 조치를 취합니다.',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="제14조(개인정보 처리방침의 변경)">
          본 방침은 {startDate.format('YYYY-MM-DD')}부터 적용됩니다. 법령, 서비스 내용 또는 처리 항목
          변경이 있는 경우 본 페이지를 통해 공지합니다. 다만, 이용자 권리에 중대한 변경이 발생하는
          경우 사전 안내 기간을 두고 고지할 수 있습니다.
        </PrivacySection>
      </div>
    </main>
  );
}
