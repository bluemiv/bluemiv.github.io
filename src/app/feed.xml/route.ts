// app/feed.xml/route.ts
import { getAllPosts } from '@/entities/post/api';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.BASE_URL;
  const authorName = process.env.METADATA_AUTHOR;
  const authorEmail = process.env.METADATA_EMAIL;

  const entriesXml = posts
    .filter((post) => post.metadata.release)
    .map((post) => {
      const { metadata } = post;
      const postUrl = `${siteUrl}/blog/${metadata.category}/${metadata.slug}`;
      const updated = new Date(metadata.createdAt).toISOString();
      const categoriesXml = metadata.tags
        .map((tag) => `<category term="${tag}" />`)
        .join('\n      ');
      const thumbnailLink = metadata.thumbnail
        ? `<link rel="enclosure" href="${siteUrl}${metadata.thumbnail}" type="image/webp" />`
        : '';

      return `
  <entry>
    <title><![CDATA[${metadata.title}]]></title>
    <link href="${postUrl}" />
    <id>${postUrl}</id>
    <updated>${updated}</updated>
    <summary><![CDATA[${metadata.description}]]></summary>
    <author>
      <name>${authorName}</name>
      <email>${authorEmail}</email>
    </author>
    ${categoriesXml}
    ${thumbnailLink}
  </entry>`;
    })
    .join('');

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${process.env.METADATA_TITLE}</title>
  <link href="${siteUrl}" />
  <updated>${new Date().toISOString()}</updated>
  <id>${siteUrl}/feed.xml</id>
  <author>
    <name>${authorName}</name>
    <email>${authorEmail}</email>
  </author>
  ${entriesXml}
</feed>`;

  return new Response(feedXml, {
    headers: {
      'Content-Type': 'application/atom+xml',
    },
  });
}

export const dynamic = 'force-static';
