const isProd = process.env.NODE_MODE === 'production';

module.exports = {
  siteMetadata: {
    title: 'Gatsby Starter w/ TypeScript',
    description: 'Gatsby Starter with TypeScript',
    author: 'wonism',
  },
  plugins: [
    'gatsby-transformer-json',
    'gatsby-plugin-emotion',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    isProd ? 'gatsby-plugin-webpack-bundle-analyzer' : null,
  ].filter(Boolean),
};
