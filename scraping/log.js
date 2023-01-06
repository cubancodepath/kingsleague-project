import pc from 'picocolors'

const symbols = {
  success: pc.green('✔'),
  error: pc.red('✖'),
  info: pc.blue('ℹ'),
  warning: pc.yellow('⚠')
}

export const logInfo = (...args) =>
  console.log(`${symbols.info} ${pc.blue(...args)}`)
export const logError = (...args) =>
  console.log(`${symbols.error} ${pc.red(...args)}`)
export const logSuccess = (...args) =>
  console.log(`${symbols.success} ${pc.green(...args)}`)
export const logWarning = (...args) =>
  console.log(`${symbols.warning} ${pc.yellow(...args)}`)
