

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
    NEXT_PUBLIC_mapbox_key: "pk.eyJ1Ijoic2t5bGFiYmxhemFyIiwiYSI6ImNtY204NHd6cjBoNXMya3FxcDhnbXpxNXcifQ.C6UUks0Cx6o_GmcGvJBXPg" // Add the NEXT_PUBLIC_ prefix
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