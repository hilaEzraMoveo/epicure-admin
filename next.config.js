/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  //basePath: "/admin",
  exportPathMap: async function (defaultPathMap) {
    delete defaultPathMap["/chefs"];
    delete defaultPathMap["/dishes"];
    delete defaultPathMap["/restaurants"];
    return defaultPathMap;
  },
};

module.exports = nextConfig;
