import { describe, expect, it, vi } from 'vitest'

vi.mock('../../cli/lib/add.mjs', () => ({
  runAddCommand: vi.fn(async () => {}),
}))

vi.mock('../../cli/lib/telemetry.mjs', () => ({
  ensureTelemetryPreference: vi.fn(async () => {
    throw new Error('permission denied')
  }),
}))

vi.mock('../../cli/lib/manifest.mjs', () => ({
  loadComponentsManifest: vi.fn(async () => ({ components: { button: {} } })),
}))

import { run } from '../../cli/lib/run.mjs'

describe('cli run', () => {
  it('continues when telemetry setup fails', async () => {
    const code = await run(['node', 'god-kit', 'add', 'button', '--yes'])
    expect(code).toBe(0)
  })
})
