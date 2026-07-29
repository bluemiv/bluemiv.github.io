import type { ComponentType, ReactNode } from 'react';
import { DEVELOPER } from '@/features/privacy';
import { BERRY_VOCA_STARTER_APP } from '../constants';

type ListProps = {
  children: ReactNode;
  ordered?: boolean;
};

type BerryVocaStarterPrivacyContentProps = {
  components: {
    Section: ComponentType<{ title: string; children: ReactNode }>;
    List: ComponentType<ListProps>;
    Notice: ComponentType<{ children: ReactNode }>;
    PolicyLink: ComponentType<{ href: string; children: ReactNode }>;
  };
  effectiveDate: string;
};

export const BerryVocaStarterPrivacyContent = ({
  components,
  effectiveDate,
}: BerryVocaStarterPrivacyContentProps) => {
  const { Section, List, Notice, PolicyLink } = components;
  const appName = BERRY_VOCA_STARTER_APP.name;

  return (
    <>
      <div className="py-lg">
        <Notice>
          {appName}는 회원가입과 자체 서버 없이 이용하는 Android 영단어 학습 앱입니다. 학습 기록과
          설정은 이용자의 기기에만 저장됩니다. 광고가 활성화된 배포본은 Google AdMob SDK를 사용하며,
          광고 요청은 아동 대상·비개인 맞춤·G 등급으로 제한합니다.
        </Notice>
      </div>

      <Section title="제1조(처리 목적)">
        <p>{appName}는 다음 목적으로 필요한 최소 범위의 정보를 처리합니다.</p>
        <List ordered>
          <li>
            <strong>학습 기능 제공:</strong> 단어 학습 진행, 퀴즈 결과, 오답, 북마크, 플래시카드,
            연속 학습, EXP, 포인트와 앱 설정 관리
          </li>
          <li>
            <strong>광고 제공:</strong> Google AdMob을 통한 배너·이용자 선택형 리워드 광고 제공과
            광고 부정 사용 방지
          </li>
          <li>
            <strong>발음 재생:</strong> 기기에 설치된 Android 음성 합성(TTS) 엔진을 통한 영단어 발음
            재생
          </li>
        </List>
      </Section>

      <Section title="제2조(처리 항목과 방법)">
        <List ordered>
          <li>
            <strong>기기에 저장되는 정보:</strong> 학습 진행, 세션 이력, 정답·오답 기록, 북마크,
            일일 목표, TTS 속도, EXP, 레벨, 포인트와 광고 보상 횟수를 SQLite 데이터베이스에
            저장합니다.
          </li>
          <li>
            <strong>AdMob에서 처리할 수 있는 정보:</strong> 광고 노출·상호작용 기록, 대략적인 진단
            정보, 운영체제·기기 모델·앱 버전·네트워크 정보 등이 Google SDK에서 자동 처리될 수
            있습니다. 앱 운영자는 이 원시 정보를 자체 서버에 수집하거나 회원 정보와 결합하지
            않습니다.
          </li>
          <li>
            <strong>Android TTS:</strong> 발음을 요청한 영단어가 이용자가 선택한 기기 TTS 엔진에
            전달됩니다. 엔진의 처리 방식은 해당 엔진과 기기 설정의 정책을 따릅니다. 앱 운영자는 발음
            요청을 자체 서버에 저장하지 않습니다.
          </li>
          <li>
            <strong>수집하지 않는 정보:</strong> 이름, 이메일, 전화번호, 주소, 연락처, 정확한 위치,
            사진, 결제정보와 자체 계정 식별자를 수집하지 않습니다.
          </li>
        </List>
      </Section>

      <Section title="제3조(아동 대상 광고 보호)">
        <List>
          <li>광고 요청은 아동 대상 처리와 동의 연령 미만 처리를 적용합니다.</li>
          <li>최대 광고 콘텐츠 등급을 모든 이용자에게 적합한 G 등급으로 제한합니다.</li>
          <li>비개인 맞춤 광고만 요청하고 관심 기반 광고와 리마케팅을 사용하지 않습니다.</li>
          <li>
            아동 대상 처리 신호가 적용된 광고 요청에서는 Google의 정책에 따라 Android 광고
            식별자(AAID)가 전송되지 않도록 처리됩니다.
          </li>
          <li>광고는 학습 완료 조건이 아니며, 리워드 광고는 이용자가 직접 선택할 때만 엽니다.</li>
        </List>
      </Section>

      <Section title="제4조(보유 및 이용 기간)">
        <List ordered>
          <li>
            기기에 저장된 학습 정보는 앱 설정의 데이터 초기화 기능을 실행하거나 앱을 삭제할 때까지
            보관됩니다.
          </li>
          <li>
            Google AdMob과 기기 TTS 엔진이 처리하는 정보의 보유 기간은 각 제공자의 정책을 따릅니다.
          </li>
          <li>법령에 별도 보존 의무가 있는 경우에는 해당 기간을 따릅니다.</li>
        </List>
      </Section>

      <Section title="제5조(제3자 제공, 처리 위탁 및 국외 이전)">
        <p>
          {appName}는 자체 서버에 회원정보를 보관하거나 판매하지 않습니다. 다음 외부 서비스가 앱
          기능 제공 과정에서 정보를 독립적으로 처리할 수 있습니다.
        </p>
        <List>
          <li>
            <strong>Google LLC / Google AdMob:</strong> 광고 제공, 성과 측정과 부정 사용 방지. 광고
            요청 시 네트워크를 통해 국외로 전송될 수 있으며 Google 정책에 따른 기간 동안 보관될 수
            있습니다.
          </li>
          <li>
            <strong>기기 TTS 제공자:</strong> 영단어 발음 합성. 설치된 엔진에 따라 제공자, 처리
            위치와 보유 정책이 달라질 수 있습니다.
          </li>
        </List>
      </Section>

      <Section title="제6조(이용자의 선택과 권리)">
        <List>
          <li>앱 설정에서 학습 기록과 설정을 2단계 확인 후 모두 삭제할 수 있습니다.</li>
          <li>앱을 삭제하면 앱 전용 로컬 데이터가 함께 삭제됩니다.</li>
          <li>리워드 광고를 보지 않아도 모든 핵심 학습 기능을 이용할 수 있습니다.</li>
          <li>Android 설정에서 사용 중인 TTS 엔진과 음성을 변경할 수 있습니다.</li>
          <li>
            문의를 통해 개인정보 열람·정정·삭제·처리정지에 관한 권리를 행사할 수 있습니다. 자체
            서버에 저장하지 않는 기기 데이터는 앱 안에서 직접 관리해야 합니다.
          </li>
        </List>
      </Section>

      <Section title="제7조(파기 절차와 안전성 확보)">
        <List>
          <li>기기 데이터는 초기화 또는 앱 삭제 시 Android 저장소에서 삭제됩니다.</li>
          <li>서버 미보유, 최소 권한, 로컬 저장, 외부 SDK 최소화 원칙을 적용합니다.</li>
          <li>광고 보상은 완료 callback과 중복 방지 키를 확인한 뒤 한 번만 기기에 기록합니다.</li>
        </List>
      </Section>

      <Section title="제8조(개인정보 보호책임자)">
        <List>
          <li>개인정보 보호책임자: 김태홍</li>
          <li>
            이메일: <PolicyLink href={`mailto:${DEVELOPER.EMAIL}`}>{DEVELOPER.EMAIL}</PolicyLink>
          </li>
          <li>전화: {DEVELOPER.PHONE_NUMBER}</li>
        </List>
      </Section>

      <Section title="제9조(권익침해 구제 방법)">
        <p>개인정보 침해 상담이나 분쟁조정이 필요한 경우 다음 기관에 문의할 수 있습니다.</p>
        <List>
          <li>
            개인정보분쟁조정위원회: 1833-6972,{' '}
            <PolicyLink href="https://www.kopico.go.kr">www.kopico.go.kr</PolicyLink>
          </li>
          <li>
            개인정보침해신고센터: 국번 없이 118,{' '}
            <PolicyLink href="https://privacy.kisa.or.kr">privacy.kisa.or.kr</PolicyLink>
          </li>
          <li>
            경찰청 사이버범죄 신고: 국번 없이 182,{' '}
            <PolicyLink href="https://ecrm.police.go.kr">ecrm.police.go.kr</PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="제10조(외부 서비스 정책)">
        <List>
          <li>
            Google 개인정보처리방침:{' '}
            <PolicyLink href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </PolicyLink>
          </li>
          <li>
            Google의 아동 대상 광고 요청 안내:{' '}
            <PolicyLink href="https://support.google.com/admob/answer/6219315">
              support.google.com/admob/answer/6219315
            </PolicyLink>
          </li>
          <li>
            AdMob 광고 콘텐츠 등급 안내:{' '}
            <PolicyLink href="https://support.google.com/admob/answer/10477886">
              support.google.com/admob/answer/10477886
            </PolicyLink>
          </li>
        </List>
      </Section>

      <Section title="제11조(방침 변경)">
        <p>
          본 방침은 {effectiveDate}부터 적용됩니다. 앱 기능, 외부 SDK 또는 관련 법령이 변경되면 변경
          내용과 시행일을 이 페이지에 공개합니다.
        </p>
      </Section>
    </>
  );
};
