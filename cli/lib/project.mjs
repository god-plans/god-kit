import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export async function readPackageJson(cwd) {
  const path = join(cwd, 'package.json')
  if (!(await fileExists(path))) return null
  try {
    const raw = await readFile(path, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function detectPackageManager(cwd) {
  if (await fileExists(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (await fileExists(join(cwd, 'yarn.lock'))) return 'yarn'
  if (await fileExists(join(cwd, 'bun.lockb'))) return 'bun'
  return 'npm'
}

export async function detectProject(cwd) {
  const pkg = await readPackageJson(cwd)
  const deps = {
    ...(pkg?.dependencies ?? {}),
    ...(pkg?.devDependencies ?? {}),
  }

  const hasNuxtConfig =
    (await fileExists(join(cwd, 'nuxt.config.ts'))) ||
    (await fileExists(join(cwd, 'nuxt.config.js'))) ||
    (await fileExists(join(cwd, 'nuxt.config.mjs')))
  const hasViteConfig =
    (await fileExists(join(cwd, 'vite.config.ts'))) ||
    (await fileExists(join(cwd, 'vite.config.js'))) ||
    (await fileExists(join(cwd, 'vite.config.mjs')))
  const hasVueEntry =
    (await fileExists(join(cwd, 'src/main.ts'))) ||
    (await fileExists(join(cwd, 'src/main.js')))

  let kind = 'unknown'
  if (hasNuxtConfig || deps.nuxt) {
    kind = 'nuxt'
  } else if ((hasViteConfig || deps.vite) && (hasVueEntry || deps.vue)) {
    kind = 'vue-vite'
  }

  const packageManager = await detectPackageManager(cwd)
  return {
    kind,
    packageManager,
    packageJson: pkg,
  }
}
