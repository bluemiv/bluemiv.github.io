import Image from 'next/image';

export default function AboutProfile() {
  return (
    <div className="overflow-hidden rounded-lg w-full h-full max-w-[768px] max-h-[512px] animate-fade-in">
      <Image
        className="w-full h-full object-cover transition ease-in-out duration-150 hover:scale-110"
        width={768}
        height={512}
        src="/about-profile.webp"
        alt="Bluemiv"
      />
    </div>
  );
}
