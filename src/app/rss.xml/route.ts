import { getAllPosts, getAllShortPosts } from '@/features/post/api';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = SITE_METADATA.baseUrl;
  const author = `${SITE_METADATA.authorEmail} (${SITE_METADATA.author})`;

  const itemsXml = posts
    .filter((post) => post.metadata.release)
    .map((post) => {
      const { metadata } = post;
      const postUrl = `${siteUrl}/blog/${metadata.category}/${metadata.slug}`;

      const categoriesXml = metadata.tags
        .map((tag) => `<category><![CDATA[${tag}]]></category>`)
        .join('');
      const authorXml = `<author>${author}</author>`;
      const dcCreatorXml = `<dc:creator><![CDATA[${SITE_METADATA.author}]]></dc:creator>`;
      const thumbnailXml = metadata.thumbnail
        ? `<enclosure url="${siteUrl}${metadata.thumbnail}" type="image/webp" />`
        : '';

      return `<item>
    <title><![CDATA[${metadata.title}]]></title>
    <link>${postUrl}</link>
    <guid>${postUrl}</guid>
    <description><![CDATA[${metadata.description}]]></description>
    <pubDate>${new Date(metadata.createdAt).toUTCString()}</pubDate>
    ${authorXml}
    ${dcCreatorXml}
    ${categoriesXml}
    ${thumbnailXml}
  </item>`;
    })
    .join('');

  const shortPosts = getAllShortPosts();
  const shortItemsXml = shortPosts
    .map((post) => {
      const { metadata } = post;
      const postUrl = `${siteUrl}${ROUTE_PATH.BLOG_SHORT}/${metadata.slug}`;

      const categoriesXml = metadata.tags
        .map((tag) => `<category><![CDATA[${tag}]]></category>`)
        .join('');
      const authorXml = `<author>${author}</author>`;
      const dcCreatorXml = `<dc:creator><![CDATA[${SITE_METADATA.author}]]></dc:creator>`;
      const thumbnailXml = metadata.thumbnail
        ? `<enclosure url="${siteUrl}${metadata.thumbnail}" type="image/webp" />`
        : '';

      return `<item>
    <title><![CDATA[${metadata.title}]]></title>
    <link>${postUrl}</link>
    <guid>${postUrl}</guid>
    <description><![CDATA[${metadata.description}]]></description>
    <pubDate>${new Date(metadata.createdAt).toUTCString()}</pubDate>
    ${authorXml}
    ${dcCreatorXml}
    ${categoriesXml}
    ${thumbnailXml}
  </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${SITE_METADATA.title}</title>
  <link>${siteUrl}</link>
  <description>${SITE_METADATA.description}</description>
  <language>ko</language>
  <ttl>60</ttl>
  <managingEditor>${author}</managingEditor>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${itemsXml}
  ${shortItemsXml}
</channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export const dynamic = 'force-static';
