import Image from 'next/image';

export const ProfileSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-md text-app-sub-text dark:text-app-dark-sub-text text-sm text-center">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          width={300}
          height={300}
          src="/r/i/profile.webp"
          alt={process.env.METADATA_AUTHOR!}
        />
      </div>
      <p>
        {process.env.METADATA_AUTHOR}({process.env.METADATA_NICNAME})
      </p>
      <p>{process.env.METADATA_DESCRIPTION}</p>
    </section>
  );
};
