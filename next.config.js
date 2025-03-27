/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // ✅ `unsafe-none` এর পরিবর্তে এটা ব্যবহার করো
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless", // ✅ আরও নিরাপদ পলিসি
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
