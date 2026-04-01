import { parseCliArgs, renderHelp } from './args.mjs'
import { runAddCommand } from './add.mjs'
import { createLogger } from './logger.mjs'
import { ensureTelemetryPreference } from './telemetry.mjs'
import { loadComponentsManifest } from './manifest.mjs'

export async function run(argv = process.argv) {
  const logger = createLogger()
  try {
    const parsed = parseCliArgs(argv)
    const manifest = await loadComponentsManifest()
    const availableComponents = Object.keys(manifest.components).sort()
    if (parsed.options.help || !parsed.command) {
      console.log(renderHelp({ availableComponents }))
      return 0
    }

    if (parsed.command !== 'add') {
      throw new Error(`Unknown command "${parsed.command}". Supported command: add`)
    }
    if (!parsed.name) {
      throw new Error('Missing component name. Usage: god-kit add <component>')
    }

    try {
      await ensureTelemetryPreference({ yes: parsed.options.yes, logger })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      logger.warn(`Telemetry preference unavailable: ${message}. Continuing.`)
    }
    await runAddCommand(parsed.name, parsed.options, logger)
    return 0
  } catch (error) {
    logger.error(error instanceof Error ? error.message : String(error))
    return 1
  }
}
