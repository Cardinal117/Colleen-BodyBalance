// Cloudflare Worker for serving static assets with correct MIME types
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Handle SPA routing - serve index.html for all routes
    if (pathname === '/' || 
        !pathname.includes('.') || 
        pathname.endsWith('.html') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/blog') ||
        pathname.startsWith('/grounded') ||
        pathname.startsWith('/personal-training') ||
        pathname.startsWith('/virtual-trainer') ||
        pathname.startsWith('/about') ||
        pathname.startsWith('/contact')) {
      
      const indexResponse = await env.ASSETS.fetch(new Request('https://colleen-bodybalance.pages.dev/index.html'));
      return indexResponse;
    }

    // Serve static assets with correct MIME types
    try {
      const assetResponse = await env.ASSETS.fetch(request);
      
      // Set correct MIME types based on file extension
      const contentType = getContentType(pathname);
      
      if (contentType) {
        const newHeaders = new Headers(assetResponse.headers);
        newHeaders.set('Content-Type', contentType);
        newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
        
        return new Response(assetResponse.body, {
          status: assetResponse.status,
          statusText: assetResponse.statusText,
          headers: newHeaders
        });
      }
      
      return assetResponse;
    } catch (error) {
      return new Response('Asset not found', { status: 404 });
    }
  }
};

function getContentType(pathname) {
  if (pathname.endsWith('.js')) return 'application/javascript';
  if (pathname.endsWith('.css')) return 'text/css';
  if (pathname.endsWith('.png')) return 'image/png';
  if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'image/jpeg';
  if (pathname.endsWith('.webp')) return 'image/webp';
  if (pathname.endsWith('.svg')) return 'image/svg+xml';
  if (pathname.endsWith('.woff')) return 'font/woff';
  if (pathname.endsWith('.woff2')) return 'font/woff2';
  if (pathname.endsWith('.html')) return 'text/html';
  return null;
}
