

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jsonkeeper.com',
      },
      // Add other domains as needed
    ],
  },
  env: {
    NEXT_PUBLIC_mapbox_key: "" // Add the NEXT_PUBLIC_ prefix
  }
};

module.exports = nextConfig;



  /*
module.exports = {

    images: {
        domains: ["links.papareact.com"],
    },


}

  */