module.exports=function (env = {}){
    let config = null;
    if(env.development){
      config=require('./config/webpack.config.dev');
    }else if(env.production){
      config=require('./config/webpack.config.prod');
    }
    return {
            entry: ['./src/main.ts'],
            module: {
              rules: [
                    {
                        test: /\.ts?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.css$/i,
                        use: [
                            'style-loader',
                            'css-loader'
                        ],
                    },
                ]
            },
            resolve: {
                extensions: [ '.ts', '.js' ],
              },
          ...config
      };
  }