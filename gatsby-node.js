const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/characters/)) {
    page.matchPath = '/characters/*';
    createPage(page);
  } else if (page.path.match(/^\/books/)) {
    page.matchPath = '/books/*';
    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@models': path.resolve(__dirname, 'src/models'),
        '@remotes': path.resolve(__dirname, 'src/remotes'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: false,
          extractComments: 'all',
          terserOptions: {
            mangle: true,
            compress: {
              arrows: false,
              drop_console: false,
              drop_debugger: true,
              typeofs: false,
            },
          },
        }),
      ],
    },
  });
};
