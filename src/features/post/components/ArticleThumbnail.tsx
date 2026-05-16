import Image from 'next/image';

interface Props {
  thumbnail: string;
  alt: string;
}

export default function ArticleThumbnail({ thumbnail, alt }: Props) {
  return (
    <div className="article-hero-thumbnail motion-card flex items-center overflow-hidden rounded-2xl w-full max-h-[360px] h-full bg-app-surface-muted dark:bg-app-dark-surface-muted mb-md border border-app-border/80 dark:border-app-dark-border/80">
      <Image
        className="w-full h-full object-cover duration-300 ease-out hover:scale-105"
        width={720}
        height={280}
        src={thumbnail}
        alt={alt}
      />
    </div>
  );
}
