import { describe, expect, it } from 'vitest'
import { parseCliArgs } from '../../cli/lib/args.mjs'

describe('cli args', () => {
  it('parses add command and flags', () => {
    const parsed = parseCliArgs([
      'node',
      'god-kit',
      'add',
      'button',
      '--yes',
      '--dry-run',
      '--cwd',
      '/tmp/demo',
      '--force',
    ])
    expect(parsed.command).toBe('add')
    expect(parsed.name).toBe('button')
    expect(parsed.options.yes).toBe(true)
    expect(parsed.options.dryRun).toBe(true)
    expect(parsed.options.force).toBe(true)
    expect(parsed.options.cwd).toBe('/tmp/demo')
  })

  it('supports equals form for cwd', () => {
    const parsed = parseCliArgs(['node', 'god-kit', 'add', 'button', '--cwd=/tmp/app'])
    expect(parsed.options.cwd).toBe('/tmp/app')
  })
})
