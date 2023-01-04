const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/scss-source/variables.scss',
          './src/scss-source/mixins.scss'
        ],
      },
    },
  ],
}
