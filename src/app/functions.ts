import * as path from 'path'

/**
 * Setup path to config folder for lambda.
 * See https://github.com/lorenwest/node-config/issues/275#issuecomment-218947256
 */
function configurePathForLambda() {
  const LAMBDA_TASK_ROOT = process.env.LAMBDA_TASK_ROOT
  if (LAMBDA_TASK_ROOT && !process.env.IS_OFFLINE) {
    const configPath = path.join(LAMBDA_TASK_ROOT, 'config')
    console.log('Setting NODE_CONFIG_DIR path for Lambda execution environment: ' + configPath)
    process.env.NODE_CONFIG_DIR = configPath
  }
}

configurePathForLambda()

export {proxy} from './functions/proxy'
