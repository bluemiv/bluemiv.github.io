import Image from 'next/image';

export const ProfileSection = () => {
  return (
    <section className="w-full rounded-xl border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface p-md flex flex-col items-center justify-center gap-md text-app-text-muted dark:text-app-dark-text-muted text-sm text-center">
      <div className="w-[88px] h-[88px] rounded-full overflow-hidden ring-4 ring-app-primary-soft dark:ring-app-dark-primary-soft">
        <Image
          className="w-full h-full object-cover hover:scale-110 duration-150 ease-in-out"
          width={300}
          height={300}
          src="/r/i/profile.webp"
          alt={process.env.METADATA_AUTHOR!}
        />
      </div>
      <p className="font-semibold text-app-text dark:text-app-dark-text">
        {process.env.METADATA_AUTHOR}({process.env.METADATA_NICNAME})
      </p>
      <p className="text-xs leading-5">{process.env.METADATA_DESCRIPTION}</p>
    </section>
  );
};
