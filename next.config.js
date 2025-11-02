

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
<<<<<<< HEAD
    NEXT_PUBLIC_mapbox_key: "pk.eyJ1Ijoic2t5bGFiYmxhemFyIiwiYSI6ImNtaGhuNnJkYTByNzIya3F0MTNkaHBudjYifQ.Oz3t6y-FvT7sTQkeDY2lFw" // Add the NEXT_PUBLIC_ prefix
=======
    NEXT_PUBLIC_mapbox_key: "pk.eyJ1Ijoic2t5bGFiYmxhemFyIiwiYSI6ImNtY204NHd6cjBoNXMya3FxcDhnbXpxNXcifQ.C6UUks0Cx6o_GmcGvJBXPg" // Add the NEXT_PUBLIC_ prefix
>>>>>>> 6e941e266b72d419359927d1db7333c26a584b86
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