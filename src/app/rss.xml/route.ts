import { getAllPosts, getAllShortPosts } from '@/entities/post/api';
import { ROUTE_PATH } from '@/shared/constants/route';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.BASE_URL;
  const author = `${process.env.METADATA_EMAIL} (${process.env.METADATA_AUTHOR})`;

  const itemsXml = posts
    .filter((post) => post.metadata.release)
    .map((post) => {
      const { metadata } = post;
      const postUrl = `${siteUrl}/blog/${metadata.category}/${metadata.slug}`;

      const categoriesXml = metadata.tags
        .map((tag) => `<category><![CDATA[${tag}]]></category>`)
        .join('');
      const authorXml = `<author>${author}</author>`;
      const dcCreatorXml = `<dc:creator><![CDATA[${process.env.METADATA_AUTHOR}]]></dc:creator>`;
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
      const dcCreatorXml = `<dc:creator><![CDATA[${process.env.METADATA_AUTHOR}]]></dc:creator>`;
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
  <title>${process.env.METADATA_TITLE}</title>
  <link>${siteUrl}</link>
  <description>${process.env.METADATA_DESCRIPTION}</description>
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
