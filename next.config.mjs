/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Feel free to modify/remove this option

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    serverActions: {
      bodySizeLimit: '50mb', // Increase the body size limit to 5MB
    },
  },
  //   reactStrictMode: false,
  images: {
    domains: [
      'h4good.s3.ap-southeast-1.amazonaws.com',
      'loremflickr.com',
      'lh3.googleusercontent.com',
      'placekitten.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'unsplash.com',
      'daisyui.com',
      'h4good.s3.ap-southeast-1.amazonaws.com',
    ],
  },
};

export default nextConfig; 
