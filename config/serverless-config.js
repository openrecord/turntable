module.exports = serverless => {
  const stage = serverless.processedInput.options.stage
  if (['staging', 'prod'].includes(stage)) {
    console.log('Loading node-config with NODE_ENV=' + stage)
    process.env.NODE_ENV = stage
  }

  return require('config')
}
