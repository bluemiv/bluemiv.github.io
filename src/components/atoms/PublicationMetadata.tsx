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
  tone?: "default" | "onMedia";
};

export function PublicationMetadata({
  author,
  labels,
  modifiedAt,
  publishedAt,
  readingTime,
  tone = "default",
}: PropsWithPublicationMetadata) {
  const isOnMedia = tone === "onMedia";

  return (
    <dl
      className={`grid grid-cols-2 gap-x-5 gap-y-3 border-t pt-5 font-mono text-sm sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 ${isOnMedia ? "border-code-foreground/25 text-code-foreground/80 mt-7" : "border-border text-muted mt-9"}`}
    >
      <div className="flex min-h-6 items-center gap-2">
        <UserRound aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
        <dt className="sr-only">{labels.author}</dt>
        <dd
          className={
            isOnMedia ? "text-code-foreground font-semibold" : "text-foreground font-semibold"
          }
        >
          {author}
        </dd>
      </div>

      <div className="flex min-h-6 items-center gap-2 whitespace-nowrap tabular-nums">
        <dt
          className={`text-xs font-semibold tracking-[0.06em] uppercase ${isOnMedia ? "text-code-foreground/65" : "text-subtle"}`}
        >
          {labels.publishedAt}
        </dt>
        <dd>
          <time dateTime={publishedAt.dateTime}>{publishedAt.text}</time>
        </dd>
      </div>

      {modifiedAt ? (
        <div className="flex min-h-6 items-center gap-2 whitespace-nowrap tabular-nums">
          <dt
            className={`text-xs font-semibold tracking-[0.06em] uppercase ${isOnMedia ? "text-code-foreground/65" : "text-subtle"}`}
          >
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
