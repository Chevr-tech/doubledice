/** @type {import('next').NextConfig} */

const envVariables = {
  NETWORK_ID: process.env.NETWORK_ID,
  GRAPHQL_QUERIES_URL: process.env.GRAPHQL_QUERIES_URL,
  PLATFORM_CONTRACT_ADDRESS: process.env.PLATFORM_CONTRACT_ADDRESS,
  DISCORD_API_URL: process.env.DISCORD_API_URL,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  PINATA_URL: process.env.PINATA_URL,
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
  NEXT_PUBLIC_ENVIRONMENT_PHASE: process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE,
  NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
};

const moduleConfig = {
  reactStrictMode: true,
  env: envVariables,
  swcMinify: false,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    removeConsole: true,
  },
  images: {
    domains: [
      "gateway.pinata.cloud",
      "asia.olympus-imaging.com",
      "ipfs.doubledice.com",
    ],
  },
};

process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE === "production" &&
  (moduleConfig.images = {
    loader: "cloudinary",
    path: process.env.IMAGE_OPTIMIZATION_URL,
    domains: ["gateway.pinata.cloud"],
  });

module.exports = moduleConfig;
