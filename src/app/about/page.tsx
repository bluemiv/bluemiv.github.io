import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="w-full">
      <div className="flex flex-col max-w-[768px] mx-auto px-md py-lg">
        <div className="max-w-[768px] max-h-[384px] w-full h-full overflow-hidden rounded-lg flex items-center justify-center">
          <Image
            className="w-full h-full object-cover transition ease-in-out duration-150 hover:scale-110"
            width={768}
            height={384}
            src="https://placehold.co/800@2x.png"
            alt="Bluemiv"
          />
        </div>
      </div>
    </main>
  );
}
