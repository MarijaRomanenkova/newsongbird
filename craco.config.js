

module.exports = {  
  webpack: {
    configure:{
       module: {        
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      './src/scss-source/_mixins.scss',
                      './src/scss-source/_variables.scss',
                    ],
                  },
                },
              ],
            },
          ],
        },    
      },
    },
  };
