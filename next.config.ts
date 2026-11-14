import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@bancactiu/db", "@bancactiu/ui-glass", "@bancactiu/interoperability-connector"],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; frame-ancestors 'none';" }
        ],
      },
    ];
  },
};

export default nextConfig;
