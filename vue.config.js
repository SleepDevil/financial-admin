module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://8.136.109.187:8000/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
