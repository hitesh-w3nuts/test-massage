/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: "https://w3nut.com/projects/massagemnl-next-backend/"
  },
  images: {
    domains: ['w3nut.com', 'secure.gravatar.com'],
  }

}

module.exports = nextConfig
