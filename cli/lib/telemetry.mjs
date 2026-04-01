import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { homedir } from 'node:os'
import { confirm } from './logger.mjs'

const configPath = join(homedir(), '.god-kit', 'config.json')

async function readConfig() {
  try {
    const raw = await readFile(configPath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function writeConfig(config) {
  await mkdir(dirname(configPath), { recursive: true })
  await writeFile(configPath, JSON.stringify(config, null, 2), 'utf8')
}

export async function ensureTelemetryPreference({ yes, logger }) {
  try {
    const cfg = await readConfig()
    if (typeof cfg.telemetryEnabled === 'boolean') return cfg.telemetryEnabled
    if (yes || !process.stdout.isTTY) {
      cfg.telemetryEnabled = false
      await writeConfig(cfg)
      return false
    }

    logger.info('Telemetry is optional and disabled by default.')
    const enabled = await confirm('Share anonymous CLI usage events to improve DX?', false)
    cfg.telemetryEnabled = enabled
    await writeConfig(cfg)
    logger.info(
      enabled
        ? 'Telemetry enabled. Disable anytime by setting telemetryEnabled=false in ~/.god-kit/config.json.'
        : 'Telemetry disabled.'
    )
    return enabled
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    logger.warn(`Could not read/write telemetry preference: ${message}. Defaulting to disabled.`)
    return false
  }
}
