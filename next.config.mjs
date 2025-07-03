/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true, // ✅ This line disables optimization for static export
  },
};

export default nextConfig;
