import Link from "next/link";

type StaticRedirectPageProps = {
  destination: string;
  message: string;
};

export function StaticRedirectPage({ destination, message }: StaticRedirectPageProps) {
  const redirectScript = `window.location.replace(${JSON.stringify(destination)});`;

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-5">
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <p className="text-muted text-sm">
        {message}{" "}
        <Link className="text-accent underline" href={destination}>
          이동하기
        </Link>
      </p>
    </div>
  );
}
