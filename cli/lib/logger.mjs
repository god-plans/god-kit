import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const useColor = output.isTTY
const paint = (code, text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text)

export function createLogger() {
  return {
    info: (message) => console.log(paint('36', `info`), message),
    success: (message) => console.log(paint('32', `success`), message),
    warn: (message) => console.warn(paint('33', `warn`), message),
    error: (message) => console.error(paint('31', `error`), message),
    step: (message) => console.log(paint('35', `step`), message),
  }
}

export async function confirm(message, defaultYes = true) {
  const suffix = defaultYes ? '[Y/n]' : '[y/N]'
  const rl = readline.createInterface({ input, output })
  try {
    const answer = (await rl.question(`${message} ${suffix} `)).trim().toLowerCase()
    if (!answer) return defaultYes
    return answer === 'y' || answer === 'yes'
  } finally {
    rl.close()
  }
}
