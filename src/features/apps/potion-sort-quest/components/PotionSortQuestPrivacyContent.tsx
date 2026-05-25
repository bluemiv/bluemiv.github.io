import type { ComponentType, ReactNode } from 'react';
import { DEVELOPER } from '@/features/privacy';
import { POTION_SORT_QUEST_APP } from '../constants';

type ListProps = {
  children: ReactNode;
  ordered?: boolean;
};

type PotionSortQuestPrivacyContentProps = {
  components: {
    Section: ComponentType<{ title: string; children: ReactNode }>;
    List: ComponentType<ListProps>;
    Notice: ComponentType<{ children: ReactNode }>;
    PolicyLink: ComponentType<{ href: string; children: ReactNode }>;
  };
  effectiveDate: string;
  externalSiteLink: ReactNode;
};

export const PotionSortQuestPrivacyContent = ({
  components,
  effectiveDate,
  externalSiteLink,
}: PotionSortQuestPrivacyContentProps) => {
  const { Section, List, Notice, PolicyLink } = components;
  const { name: appName } = POTION_SORT_QUEST_APP;

  return (
    <>
      <div className="py-lg">
        <Notice>
          본 개인정보 처리방침은 &lt;&lsquo;{appName}&rsquo;&gt;(사이트주소: {externalSiteLink})가
          「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 관련 문의를 원활하게
          처리하기 위하여 수립·공개하는 것입니다. {appName}는 회원가입 없이 이용할 수 있으며, 별도
          회원 데이터베이스 또는 자체 서버를 운영하지 않습니다. 일부 광고 기능은 Google AdMob SDK를
          통해 제공됩니다.
        </Notice>
      </div>

      <Section title="제1조(처리 목적)">
        <p>
          {appName}는 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 명시된 목적 외의 용도로는
          이용하지 않으며, 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도 동의를
          받는 등 필요한 조치를 이행합니다.
        </p>
        <List ordered>
          <li>
            <strong>앱 기능 제공:</strong> 포션 색상 정렬 퍼즐 플레이, 레벨 진행, 힌트·되돌리기,
            코인 보상, 배경음악 설정, 언어 설정, 앱 설정 저장
          </li>
          <li>
            <strong>광고 제공:</strong> Google AdMob을 통한 배너·전면·보상형 광고 노출, 광고 성과
            측정, 부정 클릭 방지 등 광고 운영 목적
          </li>
          <li>
            <strong>리뷰 요청:</strong> 앱 사용 경험을 해치지 않는 범위에서 Google Play 리뷰 요청
            표시 여부를 기기 내에서 관리
          </li>
        </List>
      </Section>

      <Section title="제2조(수집 항목 및 수집 방법)">
        <List ordered>
          <li>
            <strong>광고 SDK를 통해 처리될 수 있는 항목:</strong> Android 광고 ID(AAID/ADID), 앱
            세트 ID 또는 SDK 인스턴스 식별자
            <List>
              <li>광고 관련 이용 기록: 광고 노출/클릭/보상형 광고 완료 등 광고 이벤트 로그</li>
              <li>
                기기·앱 정보: 운영체제 종류/버전, 단말기 모델, 앱 버전, 네트워크 상태 등 AdMob SDK가
                자동으로 처리할 수 있는 정보
              </li>
            </List>
            <Notice>
              광고 식별자는 단말기별 재설정 가능한 식별자이며, 단말 설정에서 재설정·삭제 또는 맞춤형
              광고 제한이 가능합니다.
            </Notice>
          </li>
          <li>
            <strong>앱 안에 저장되는 정보:</strong> 현재 레벨, 보유 코인, 힌트·되돌리기 사용 상태,
            언어 설정, 배경음악 설정, 리뷰 요청 표시 기록, 전면 광고 노출 제한 상태 등은 이용자의
            기기 안에 저장됩니다. {appName}는 이를 별도 서버로 전송하거나 계정과 연결하지 않습니다.
          </li>
          <li>
            <strong>수집하지 않는 항목:</strong> 이름, 전화번호, 이메일, 주소록, 정확한 위치정보,
            사진, 카메라, 마이크 녹음, 결제정보 등 직접 식별 가능한 개인정보는 앱 차원에서 수집하지
            않습니다.
          </li>
        </List>
      </Section>

      <Section title="제3조(보유 및 이용 기간)">
        <List ordered>
          <li>
            {appName}는 별도 서버를 통해 회원정보나 앱 이용 내역을 저장하지 않습니다. 기기 안에
            저장된 레벨 진행, 코인, 설정 등은 이용자가 앱 데이터를 삭제하거나 앱을 삭제하면 함께
            삭제됩니다.
          </li>
          <li>
            Google AdMob을 통해 처리되는 광고 관련 정보는 Google LLC의 보관기간 및 정책에 따릅니다.
          </li>
          <li>법령상 보존 의무가 있는 경우에는 해당 법령에서 정한 기간 동안 보관할 수 있습니다.</li>
        </List>
      </Section>

      <Section title="제4조(개인정보의 제3자 제공)">
        <p>
          {appName}는 이용자의 개인정보를 판매하지 않으며, 별도 서버에 보관한 회원정보를 제3자에게
          제공하지 않습니다. 다만, 법령에 근거가 있거나 정보주체의 별도 동의를 받은 경우에는 필요한
          범위에서 제공할 수 있습니다. 광고 SDK를 통해 Google LLC가 독립적으로 처리하는 정보는 해당
          사업자의 정책이 적용됩니다.
        </p>
      </Section>

      <Section title="제5조(처리 위탁 및 국외 이전)">
        <List ordered>
          <li>
            {appName}는 광고 제공을 위해 Google AdMob SDK를 사용합니다. 이 과정에서 광고 관련 정보가
            Google LLC로 전송될 수 있으며, Google LLC가 국외에 위치하므로 국외 이전이 발생할 수
            있습니다.
            <List>
              <li>수탁자/이전받는 자: Google LLC(AdMob)</li>
              <li>이전 국가: 미국</li>
              <li>이전 일시 및 방법: 앱 사용 시점마다 네트워크를 통한 실시간 전송</li>
              <li>
                이전 항목: Android 광고 ID(AAID/ADID), 앱 세트 ID 또는 SDK 인스턴스 식별자, 광고
                이벤트 로그, 기기·앱 정보
              </li>
              <li>이용 목적: 광고 제공 및 운영</li>
              <li>보유·이용 기간: Google LLC 정책에 따름</li>
            </List>
          </li>
        </List>
      </Section>

      <Section title="제6조(자동 수집 장치의 설치·운영 및 거부)">
        <List ordered>
          <li>
            <strong>쿠키:</strong> {appName}는 모바일 앱 특성상 쿠키를 직접 사용하지 않습니다.
          </li>
          <li>
            <strong>Android 광고 ID(AAID/ADID):</strong> 광고 제공을 위해 사용될 수 있습니다.
            <List>
              <li>
                Android: 설정 &gt; 개인정보 보호 &gt; 광고 &gt; 광고 ID 재설정/삭제, 맞춤형 광고
                제한 설정 가능
              </li>
              <li>
                설정 변경 시 맞춤형 광고가 제한되거나 광고 식별자가 재설정·삭제될 수 있습니다.
              </li>
            </List>
          </li>
        </List>
      </Section>

      <Section title="제7조(개인정보의 파기 절차 및 방법)">
        <List ordered>
          <li>앱이 별도 서버에 저장하는 회원정보는 없습니다.</li>
          <li>기기 내 저장 정보는 앱 데이터 삭제 또는 앱 삭제 시 삭제됩니다.</li>
          <li>전자적 파일을 별도로 보유하게 되는 경우 복구·재생이 불가능한 방법으로 삭제합니다.</li>
        </List>
      </Section>

      <Section title="제8조(개인정보의 안전성 확보 조치)">
        <p>
          {appName}는 「개인정보의 안전성 확보조치 기준」을 준수하기 위해 다음과 같은 조치를
          취합니다.
        </p>
        <List>
          <li>
            개인정보 최소 처리, 서버 미보유 원칙, 외부 SDK 설정 점검, 앱 권한 최소화, 로컬 저장소
            사용, 개발 환경 접근 통제, 보안 업데이트 점검 등
          </li>
        </List>
      </Section>

      <Section title="제9조(정보주체의 권리·의무 및 행사 방법)">
        <List>
          <li>
            정보주체는 {appName}에 대해 언제든지 열람·정정·삭제·처리정지 요구 등을 행사할 수
            있습니다. 다만 {appName}가 별도 서버에 보관하지 않는 기기 내 저장 정보는 이용자가 앱
            데이터 삭제 또는 앱 삭제를 통해 직접 삭제할 수 있습니다.
          </li>
          <li>
            권리 행사는 서면, 이메일 등으로 신청하실 수 있으며, {appName}는 법령상 정해진 절차와
            기간에 따라 확인 후 조치합니다.
          </li>
          <li>
            법령에 따라 열람 제한 또는 처리정지 거절 사유가 존재하는 경우 관련 규정에 따릅니다.
          </li>
        </List>
      </Section>

      <Section title="제10조(개인정보 보호책임자 및 열람청구 창구)">
        <List>
          <li>개인정보 보호책임자: 김태홍 (직책/직급: 없음)</li>
          <li>
            연락처: {DEVELOPER.PHONE_NUMBER},{' '}
            <PolicyLink href={`mailto:${DEVELOPER.EMAIL}`}>{DEVELOPER.EMAIL}</PolicyLink>
          </li>
          <li>열람청구 접수·처리 담당: 동일</li>
        </List>
      </Section>

      <Section title="제11조(권익침해 구제 방법)">
        <p>개인정보 침해에 대한 상담·분쟁조정을 원하시는 경우 아래 기관에 문의할 수 있습니다.</p>
        <List>
          <li>
            개인정보분쟁조정위원회: 1833-6972,{' '}
            <PolicyLink href="https://www.kopico.go.kr">www.kopico.go.kr</PolicyLink>
          </li>
          <li>
            개인정보침해신고센터(한국인터넷진흥원): 국번없이 118,{' '}
            <PolicyLink href="https://privacy.kisa.or.kr">privacy.kisa.or.kr</PolicyLink>
          </li>
          <li>
            대검찰청: 1301, <PolicyLink href="https://www.spo.go.kr">www.spo.go.kr</PolicyLink>
          </li>
          <li>
            경찰청 사이버범죄신고: 182,{' '}
            <PolicyLink href="https://ecrm.cyber.go.kr">ecrm.cyber.go.kr</PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="제12조(외부 서비스와의 연동)">
        <p>
          본 앱은 광고 제공을 위해 Google LLC의 AdMob SDK를 사용합니다. 해당 사업자가 자체적으로
          개인정보를 수집·처리하는 경우, 해당 사업자의 개인정보 처리방침과 광고 정책이 적용됩니다.
        </p>
        <List>
          <li>
            Google 개인정보 처리방침:{' '}
            <PolicyLink href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </PolicyLink>
          </li>
          <li>
            Google 광고 설정:{' '}
            <PolicyLink href="https://adssettings.google.com">adssettings.google.com</PolicyLink>
          </li>
          <li>
            Google AdMob 및 Google Play 데이터 공개 안내:{' '}
            <PolicyLink href="https://developers.google.com/admob/android/privacy/play-data-disclosure">
              developers.google.com/admob/android/privacy/play-data-disclosure
            </PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="제13조(개인정보 처리방침의 변경)">
        <p>
          본 방침은 {effectiveDate}부터 적용됩니다. 법령, 서비스 내용, 수탁자 변경 등이 있을 경우
          웹사이트 공지 등을 통해 변경사항과 시행일자를 안내합니다.
        </p>
      </Section>
    </>
  );
};
