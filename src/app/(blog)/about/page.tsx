import AboutProfile from '@/app/(blog)/about/_components/AboutProfile';
import { SplitText } from '@/shared/ui';

export default function AboutPage() {
  return (
    <main className="w-full">
      <div className="max-w-[768px] mx-auto px-md py-lg flex flex-col gap-lg">
        <AboutProfile />
        <div className="flex flex-col gap-md items-center text-center">
          <div className="text-2xl">
            <SplitText text="Front-End 개발자 " />
            <SplitText className="font-semibold" text="김태홍 " startIndex={2} />
            <SplitText text="입니다." startIndex={3} />
          </div>
          <div>
            <div>
              <SplitText text="포기하지 않고 끊임없는 " startIndex={4} />
              <SplitText className="font-semibold" text="도전" startIndex={7} />
              <SplitText text="하며," startIndex={7} />
            </div>
            <div>
              <SplitText text="결과뿐 아니라 과정에서도 " startIndex={8} />
              <SplitText className="font-semibold" startIndex={11} text="높은 완성도" />
              <SplitText text="를 추구하는 개발자입니다." startIndex={12} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
