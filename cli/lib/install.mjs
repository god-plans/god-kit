import { spawn } from 'node:child_process'

function commandFor(pm, deps) {
  if (pm === 'pnpm') return ['pnpm', ['add', ...deps]]
  if (pm === 'yarn') return ['yarn', ['add', ...deps]]
  if (pm === 'bun') return ['bun', ['add', ...deps]]
  return ['npm', ['install', ...deps]]
}

export async function installDependencies(packageManager, deps, cwd, logger) {
  if (!deps.length) return
  if (process.env.GK_CLI_SKIP_INSTALL === '1') {
    logger.info(`Skipping install (GK_CLI_SKIP_INSTALL=1): ${deps.join(', ')}`)
    return
  }

  const [cmd, args] = commandFor(packageManager, deps)
  logger.info(`Installing dependencies with ${cmd}: ${deps.join(', ')}`)

  await new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      env: process.env,
    })
    child.on('exit', (code) => {
      if (code === 0) resolve(undefined)
      else reject(new Error(`${cmd} exited with code ${code ?? 1}`))
    })
    child.on('error', reject)
  })
}
