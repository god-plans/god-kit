function parseBooleanFlag(tokens, idx, knownFlags) {
  const token = tokens[idx]
  if (!token.startsWith('--')) return null
  const [name, rawValue] = token.split('=')
  if (!knownFlags.has(name)) return null
  if (rawValue === undefined) return { key: name, value: true, consumed: 1 }
  if (rawValue === 'true') return { key: name, value: true, consumed: 1 }
  if (rawValue === 'false') return { key: name, value: false, consumed: 1 }
  throw new Error(`Invalid value for ${name}: ${rawValue}. Use true or false.`)
}

function normalizePositionals(positionals) {
  const [command, second, third] = positionals
  if (command === 'add' && second === 'gk' && third) {
    return {
      command,
      name: third,
      normalizedFromAlias: true,
    }
  }
  return {
    command,
    name: second,
    normalizedFromAlias: false,
  }
}

export function parseCliArgs(argv) {
  const tokens = argv.slice(2)
  const knownBooleanFlags = new Set(['--yes', '--dry-run', '--force', '--help'])
  const options = {
    yes: false,
    dryRun: false,
    force: false,
    cwd: process.cwd(),
    help: false,
  }

  const positionals = []
  let i = 0
  while (i < tokens.length) {
    const token = tokens[i]
    const parsed = parseBooleanFlag(tokens, i, knownBooleanFlags)
    if (parsed) {
      if (parsed.key === '--yes') options.yes = Boolean(parsed.value)
      if (parsed.key === '--dry-run') options.dryRun = Boolean(parsed.value)
      if (parsed.key === '--force') options.force = Boolean(parsed.value)
      if (parsed.key === '--help') options.help = Boolean(parsed.value)
      i += parsed.consumed
      continue
    }

    if (token === '--cwd') {
      const next = tokens[i + 1]
      if (!next || next.startsWith('--')) {
        throw new Error('Missing value for --cwd')
      }
      options.cwd = next
      i += 2
      continue
    }

    if (token.startsWith('--cwd=')) {
      options.cwd = token.slice('--cwd='.length)
      i += 1
      continue
    }

    if (token.startsWith('--')) {
      throw new Error(`Unknown flag: ${token}`)
    }

    positionals.push(token)
    i += 1
  }

  const normalized = normalizePositionals(positionals)
  return { ...normalized, options, positionals }
}

export function renderHelp({ availableComponents = [] } = {}) {
  const available =
    availableComponents.length > 0 ? `\nAvailable now: ${availableComponents.join(', ')}` : ''
  return `god-kit CLI

Usage:
  npx god-kit@latest add <component> [options]
  npx add gk <component> (compatibility alias)

Options:
  --yes           Skip prompts and use defaults
  --dry-run       Print changes without writing files
  --cwd <path>    Run in a specific directory
  --force         Overwrite conflicting files
  --help          Show this message
${available}
`
}
