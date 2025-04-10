import { getAllPosts } from '@/entities/post/api';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.BASE_URL || 'https://bluemiv.github.io';

  const itemsXml = posts
    .filter((post) => post.metadata.release) // 공개된 포스트만 포함
    .map((post) => {
      const { metadata } = post;
      const postUrl = `${siteUrl}/posts/${metadata.slug}`;
      return `
  <item>
    <title><![CDATA[${metadata.title}]]></title>
    <link>${postUrl}</link>
    <guid>${postUrl}</guid>
    <description><![CDATA[${metadata.description}]]></description>
    <pubDate>${new Date(metadata.createdAt).toUTCString()}</pubDate>
  </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${process.env.METADATA_TITLE}</title>
  <link>${siteUrl}</link>
  <description>${process.env.METADATA_DESCRIPTION}</description>
  <language>ko</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${itemsXml}
</channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export const dynamic = 'force-static';
