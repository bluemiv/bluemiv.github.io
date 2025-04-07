import Image from 'next/image';

interface Props {
  thumbnail: string;
  alt: string;
}

export default function ArticleThumbnail({ thumbnail, alt }: Props) {
  return (
    <div className="overflow-hidden rounded-lg w-full max-h-[280px] h-full bg-app-sub-bg mb-md">
      <Image
        className="w-full h-full object-cover duration-150 ease-in-out hover:scale-110"
        width={720}
        height={280}
        src={thumbnail}
        alt={alt}
      />
    </div>
  );
}
