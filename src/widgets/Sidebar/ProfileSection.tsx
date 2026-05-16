import Image from 'next/image';

export const ProfileSection = () => {
  return (
    <section className="motion-card w-full rounded-2xl border border-app-border/80 dark:border-app-dark-border/80 bg-app-surface/80 dark:bg-app-dark-surface/70 p-md text-app-text-muted dark:text-app-dark-text-muted text-sm">
      <div className="flex items-start gap-md">
        <div className="relative shrink-0">
          <div className="absolute inset-[-4px] rounded-2xl bg-gradient-to-br from-app-primary-soft via-app-accent-soft to-transparent dark:from-app-dark-primary-soft dark:via-app-dark-accent-soft opacity-90" />
          <div className="relative w-[64px] h-[64px] rounded-2xl overflow-hidden ring-1 ring-app-border dark:ring-app-dark-border">
            <Image
              className="w-full h-full object-cover hover:scale-110 duration-150 ease-in-out"
              width={300}
              height={300}
              src="/r/i/profile.webp"
              alt={process.env.METADATA_AUTHOR!}
            />
          </div>
        </div>
        <div className="min-w-0 flex-1 pt-xs">
          <p className="font-bold leading-5 text-app-text dark:text-app-dark-text">
            {process.env.METADATA_NICNAME}
          </p>
          <p className="text-xs leading-5 text-app-text-subtle dark:text-app-dark-text-subtle">
            {process.env.METADATA_AUTHOR}
          </p>
        </div>
      </div>
      <p className="mt-md text-xs leading-5">{process.env.METADATA_DESCRIPTION}</p>
    </section>
  );
};
