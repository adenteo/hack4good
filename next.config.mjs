/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Feel free to modify/remove this option

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  //   reactStrictMode: false,
  images: {
    domains: [
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
