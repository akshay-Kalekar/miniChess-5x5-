/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'static/assets/sounds',
          publicPath: '/_next/static/assets/sounds',
          name: '[name].[hash].[ext]',
        },
      },
    });
    config.module.rules.push({
      test: /\.lottie$/,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'static/assets/lotties',
          publicPath: '/_next/static/assets/lotties',
          name: '[name].[hash].[ext]',
        },
      },
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      type: 'asset/resource', 
      generator: {
        filename: 'static/assets/images/[name].[hash][ext]', 
      },
    });

    

    return config;
  },
};

export default nextConfig;
