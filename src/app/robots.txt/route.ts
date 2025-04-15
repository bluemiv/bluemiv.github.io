export async function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://bluemiv.github.io/sitemap.xml

#DaumWebMasterTool:723c398ab07c8bce7a728fb97acb3474cd056c4b061d3761199e9a7e8a52cdd3:D9a8IEFAzmC/NWsQ3tB0Wg==`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export const dynamic = 'force-static';
