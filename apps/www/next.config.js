await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  // experimental: {
  //   reactCompiler: true,
  // },
  webpack: (config) => {
    config.experiments = { asyncWebAssembly: true, layers: true };
    return config;
  },
};

export default config;
