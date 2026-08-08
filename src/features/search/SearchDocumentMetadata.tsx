type PropsWithSearchDocumentMetadata = {
  category?: string;
  description: string;
  publishedAt: string;
  tags: readonly string[];
  title: string;
  topics?: readonly string[];
};

export function SearchDocumentMetadata({
  category,
  description,
  publishedAt,
  tags,
  title,
  topics = [],
}: PropsWithSearchDocumentMetadata) {
  return (
    <div className="hidden" aria-hidden="true">
      <time dateTime={publishedAt} data-pagefind-meta="publishedAt[datetime]" />
      <span data-pagefind-weight="10">{title}</span>
      <span data-pagefind-weight="3">{description}</span>
      {category ? (
        <span data-pagefind-meta="category" data-pagefind-weight="2">
          {category}
        </span>
      ) : null}
      {topics.length ? (
        <span data-pagefind-meta="topics" data-pagefind-weight="2">
          {topics.join(" ")}
        </span>
      ) : null}
      {tags.length ? (
        <span data-pagefind-meta="tags" data-pagefind-weight="2">
          {tags.join(" ")}
        </span>
      ) : null}
      {tags.map((tag) => (
        <span key={tag} data-pagefind-filter="tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
