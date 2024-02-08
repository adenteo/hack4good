/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Feel free to modify/remove this option

  // Indicate that these packages should not be bundled by webpack
  experimental: {
	serverActions: {
		bodySizeLimit: '100mb',
	  },
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    serverActions: {
      bodySizeLimit: '50mb', // Increase the body size limit to 5MB
    },
  },
  //   reactStrictMode: false,
  images: {
    remotePatterns: [
		{
		  protocol: "https",
		  hostname: "**",
		},
	  ],
  },
};

export default nextConfig; 
