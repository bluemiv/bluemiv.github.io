import dayjs from 'dayjs';
import Link from 'next/link';
import { PrivacyList, PrivacySection } from '@/entities/privacy';
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
            { title: '🇰🇷 한국어', href: ROUTE_PATH.PRIVACY_KPOP_KO },
            { title: '🇺🇸 English', href: ROUTE_PATH.PRIVACY_KPOP_EN },
            { title: '🇯🇵 日本語', href: ROUTE_PATH.PRIVACY_KPOP_JP },
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

        <h1 className="font-semibold text-2xl mb-md">隐私政策</h1>
        <p>施行日期: {startDate.format('YYYY-MM-DD')}</p>
        <p>
          本隐私政策由 &lt;&lsquo;{appName}&rsquo;&gt;（访问地址:{' '}
          <Link
            className="text-app-primary dark:text-app-dark-primary underline"
            href={DEVELOPER.SITE_URL}
          >
            {DEVELOPER.SITE_URL}
          </Link>
          ）依据《个人信息保护法》第30条制定并公开，旨在保护信息主体的个人信息，并及时、顺畅地处理相关投诉。
        </p>

        <PrivacySection title="第1条（处理目的）">
          <p>
            {appName}
            仅为以下目的处理最少限度的个人信息。除所列目的外不作他用；如处理目的发生变化，将依据《个人信息保护法》第18条采取取得单独同意等必要措施。
          </p>
          <PrivacyList
            type="ol"
            items={[
              {
                title: '内容提供',
                text: '在应用内提供观看特定歌手的 YouTube 视频功能，以及下载互联网上公开照片的功能。',
              },
              {
                title: '广告投放、统计与质量改进',
                text: '个性化广告投放、反欺诈点击、应用使用分析（GA4）、以及服务质量改进。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第2条（收集项目及收集方式）">
          <PrivacyList
            type="ol"
            items={[
              {
                title: '收集项目（必填）— 移动广告标识符',
                text: 'Android Advertising ID（AAID/ADID）或 iOS IDFA',
                children: [
                  {
                    title: '广告/分析相关使用记录',
                    text: '广告展示/点击、屏幕浏览、按钮点击等事件日志。',
                  },
                  {
                    title: '设备及应用信息',
                    text: '操作系统类型/版本、设备型号、应用版本等（可能由分析 SDK 自动收集）。',
                  },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    广告标识符为可按设备重置的标识。用户可在设备设置中进行重置/删除，或限制个性化广告。
                  </div>
                ),
              },
              {
                title: '收集方式',
                children: [
                  {
                    text: '无需注册/登录。在应用安装并使用时，通过移动 SDK（如 Google AdMob、GA4）自动收集。',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第3条（保存及使用期限）">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '{appName}不运营单独服务器以长期保存用户的识别信息；用于广告与分析的数据遵循相应 SDK 提供商的保留设置与政策。',
              },
              {
                title: 'GA4 保留期限',
                text: '管理员可在 2 个月或 14 个月之间选择；Google Signals 数据最长可保存 26 个月，与上述设置无关。',
              },
              {
                title: '当目的达成或保留期限届满时，将立即销毁；法律另有要求的，予以单独分类保存。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第4条（向第三方提供）">
          {appName}
          原则上不向第三方提供用户个人信息。但在具有法律依据或已取得信息主体单独同意的情形下，可能提供。
        </PrivacySection>

        <PrivacySection title="第5条（处理委托及跨境传输）">
          <PrivacyList
            type="ol"
            items={[
              {
                text: '为稳定提供服务，{appName}可能将部分个人信息处理业务委托给外部受托方。若受托方位于境外，则可能发生跨境传输。签订委托合同时，将遵守个人信息保护相关法律法规。',
                children: [
                  { title: '受托方/接收方', text: 'Google LLC（AdMob, Google Analytics）' },
                  { title: '接收国家/地区', text: '美国' },
                  { title: '传输时间与方式', text: '应用使用时，通过网络实时传输。' },
                  {
                    title: '传输项目',
                    text: '广告标识符（AAID/IDFA）、使用记录（广告展示/点击、事件日志等）、设备/应用信息（操作系统、设备型号、应用版本等）。',
                  },
                  { title: '使用目的', text: '广告投放、统计分析、服务质量改进。' },
                  { title: '保存与使用期限', text: '依第3条及各受托方政策执行。' },
                ],
                extra: (
                  <div className="border-l-4 border-app-sub-bg dark:border-app-sub-bg pl-md">
                    （参考）在 Android 上，用户可于设置中重置/删除广告ID，并限制个性化广告。
                  </div>
                ),
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第6条（自动收集工具的安装、运作及拒绝）">
          <PrivacyList
            type="ol"
            items={[
              { title: 'Cookie', text: '鉴于移动应用特性，{appName}不使用Cookie。' },
              {
                title: '广告标识符（AAID/IDFA）',
                text: '用于广告投放与分析。',
                children: [
                  {
                    title: 'Android',
                    text: '设置 ＞ 隐私 ＞ 广告 ＞ 重置/删除广告ID，并可限制个性化广告。',
                  },
                  {
                    text: '（iOS 亦可在系统设置中管理跟踪许可。）更改上述设置后，可能限制个性化广告或重置/删除相关标识符。',
                  },
                ],
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第7条（个人信息的销毁程序及方法）">
          <PrivacyList
            type="ol"
            items={[
              { text: '出现销毁事由时，将不延迟地进行销毁。' },
              { title: '电子文件', text: '以不可恢复的技术方法永久删除。' },
              { title: '纸质资料', text: '粉碎或焚毁。' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第8条（安全性保障措施）">
          为遵循《确保个人信息安全性的基准》，{appName}采取以下措施：
          <PrivacyList
            items={[
              {
                text: '制定并实施内部管理计划、访问权限管理、保存并防止篡改访问记录、（在可行范围内）加密、防恶意软件与安全程序的应用、定期检查与培训等。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第9条（信息主体的权利义务及行使方式）">
          <PrivacyList
            items={[
              {
                text: '信息主体可随时行使对{appName}的查阅、更正、删除、停止处理等权利。亦可通过代理人行使（需提交规定格式的委托书）。',
              },
              {
                text: '可通过书面、电子邮件、传真等方式提出请求；{appName}将不延迟地予以处理。',
              },
              {
                text: '如依据法律存在查阅限制或拒绝停止处理的事由，将依相关规定办理。',
              },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第10条（个人信息保护负责人及查阅申请窗口）">
          <PrivacyList
            items={[
              { title: '个人信息保护负责人', text: 'Kim Taehong（无职务/职级）' },
              {
                title: '联系方式',
                text: (
                  <span>
                    {DEVELOPER.PHONE_NUMBER}，{' '}
                    <Link
                      className="text-app-primary dark:text-app-dark-primary underline"
                      href={`mailto:${DEVELOPER.EMAIL}`}
                    >
                      {DEVELOPER.EMAIL}
                    </Link>
                  </span>
                ),
              },
              { title: '查阅申请受理与处理窗口', text: '同上' },
            ]}
          />
        </PrivacySection>

        <PrivacySection title="第11条（权利侵害的救济途径）">
          <PrivacyList
            items={[
              { text: '如需就个人信息侵害进行咨询或争议调解，可联系以下机构：' },
              {
                title: '个人信息争议调解委员会',
                text: (
                  <span>
                    1833-6972，{' '}
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
                title: '个人信息侵害申告中心（KISA）',
                text: (
                  <span>
                    118，{' '}
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
                title: '最高检察厅',
                text: (
                  <span>
                    1301，{' '}
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
                title: '警察厅 网络犯罪举报',
                text: (
                  <span>
                    182，{' '}
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

        <PrivacySection title="第12条（与外部服务的联动）">
          本应用通过 YouTube 链接/播放器提供内容。若 YouTube
          或其他外部平台自行收集与处理个人信息，将适用其各自的隐私政策；详情请参阅相关服务提供商的政策。
        </PrivacySection>

        <PrivacySection title="第13条（本政策的变更）">
          本政策自 {startDate.format('YYYY-MM-DD')}{' '}
          起适用。若因法律、服务内容或受托方变更等产生调整，{appName}
          将通过网站公告等方式告知变更内容与生效日期。
        </PrivacySection>
      </div>
    </main>
  );
}
