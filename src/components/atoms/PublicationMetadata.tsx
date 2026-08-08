import { Clock3, UserRound } from "lucide-react";

type PublicationDateValue = {
  dateTime: string;
  text: string;
};

type PublicationReadingTimeValue = {
  minutes: number;
  text: string;
};

type PropsWithPublicationMetadata = {
  author: string;
  labels: {
    author: string;
    publishedAt: string;
    modifiedAt: string;
    readingTime: string;
  };
  modifiedAt?: PublicationDateValue;
  publishedAt: PublicationDateValue;
  readingTime?: PublicationReadingTimeValue;
};

export function PublicationMetadata({
  author,
  labels,
  modifiedAt,
  publishedAt,
  readingTime,
}: PropsWithPublicationMetadata) {
  return (
    <dl className="border-border text-muted mt-9 grid grid-cols-2 gap-x-5 gap-y-3 border-t pt-5 font-mono text-sm sm:flex sm:flex-wrap sm:items-center sm:gap-x-6">
      <div className="flex min-h-6 items-center gap-2">
        <UserRound aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
        <dt className="sr-only">{labels.author}</dt>
        <dd className="text-foreground font-semibold">{author}</dd>
      </div>

      <div className="flex min-h-6 items-center gap-2 tabular-nums">
        <dt className="text-subtle text-xs font-semibold tracking-[0.06em] uppercase">
          {labels.publishedAt}
        </dt>
        <dd>
          <time dateTime={publishedAt.dateTime}>{publishedAt.text}</time>
        </dd>
      </div>

      {modifiedAt ? (
        <div className="flex min-h-6 items-center gap-2 tabular-nums">
          <dt className="text-subtle text-xs font-semibold tracking-[0.06em] uppercase">
            {labels.modifiedAt}
          </dt>
          <dd>
            <time dateTime={modifiedAt.dateTime}>{modifiedAt.text}</time>
          </dd>
        </div>
      ) : null}

      {readingTime ? (
        <div className="flex min-h-6 items-center gap-2 tabular-nums">
          <Clock3 aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
          <dt className="sr-only">{labels.readingTime}</dt>
          <dd>
            <time dateTime={`PT${readingTime.minutes}M`}>{readingTime.text}</time>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
