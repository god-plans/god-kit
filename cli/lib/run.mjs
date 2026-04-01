import { parseCliArgs, renderHelp } from './args.mjs'
import { runAddCommand } from './add.mjs'
import { createLogger } from './logger.mjs'
import { ensureTelemetryPreference } from './telemetry.mjs'

export async function run(argv = process.argv) {
  const logger = createLogger()
  try {
    const parsed = parseCliArgs(argv)
    if (parsed.options.help || !parsed.command) {
      console.log(renderHelp())
      return 0
    }

    if (parsed.command !== 'add') {
      throw new Error(`Unknown command "${parsed.command}". Supported command: add`)
    }
    if (!parsed.name) {
      throw new Error('Missing component name. Usage: god-kit add <component>')
    }

    await ensureTelemetryPreference({ yes: parsed.options.yes, logger })
    await runAddCommand(parsed.name, parsed.options, logger)
    return 0
  } catch (error) {
    logger.error(error instanceof Error ? error.message : String(error))
    return 1
  }
}
