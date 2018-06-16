module.exports = serverless => {
  if (['staging', 'prod'].includes(serverless.service.provider.stage)) {
    process.env.NODE_ENV = serverless.service.provider.stage
  }

  return require('config')
}
