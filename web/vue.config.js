let settings
try {
  settings = require('./vue.config.settings')
} catch (ex) {
  settings = {}
}

settings = Object.assign({}, require('./vue.config.settings.default'), settings)

const config = {
  lintOnSave: true,
  devServer: {
    host: '0.0.0.0',
    port: settings.port,
    disableHostCheck: true,
    watchOptions: {
      poll: 1000,
    }
  }
}

module.exports = config
