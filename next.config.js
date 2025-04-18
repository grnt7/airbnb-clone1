

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'links.papareact.com',
          // optional: port: '',
          // optional: pathname: '/account123/**',
        },
        {
          protocol: 'https',
          hostname: 'www.jsonkeeper.com',
        },
        // Add other domains as needed
      ],
    },
  };
  
  module.exports = nextConfig;



  /*
module.exports = {

    images: {
        domains: ["links.papareact.com"],
    },


}

  */