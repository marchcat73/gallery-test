module.exports = config => {
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [
      require('postcss-preset-env')({
        stage: 1
      }),
      require('postcss-safe-parser'),
      require('postcss-import'),
      require('postcss-nested'),
      require('autoprefixer'),
      require('postcss-extend'),
      require('postcss-all-link-colors'),
      require('postcss-css-variables'),
      require('postcss-minimize')
    ]
  });

  return config;
};
