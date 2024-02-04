/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Feel free to modify/remove this option

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'placekitten.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'unsplash.com',
      'daisyui.com',
    ],
  },
};

export default nextConfig;
