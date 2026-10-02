import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy route for Wikimedia Commons images.
 * Usage: /api/wiki-img?file=FileName.jpg&w=200
 * This follows the Special:FilePath redirect on the server side and
 * streams the image back, bypassing browser cross-origin redirect issues.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');
  const width = searchParams.get('w') || '200';

  if (!file) {
    return new NextResponse('Missing file param', { status: 400 });
  }

  const wikiUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

  try {
    const res = await fetch(wikiUrl, {
      headers: {
        'User-Agent': 'PujorPothe/1.0 (https://pujorpothe.vercel.app)',
        Referer: 'https://commons.wikimedia.org/',
      },
      redirect: 'follow',
    });

    if (!res.ok) {
      return new NextResponse('Image fetch failed', { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return new NextResponse('Proxy error', { status: 500 });
  }
}
