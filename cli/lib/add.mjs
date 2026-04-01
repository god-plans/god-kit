import { join, resolve } from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'
import { detectProject } from './project.mjs'
import { ensureLine, readText, writePlannedFile } from './files.mjs'
import { installDependencies } from './install.mjs'
import { loadComponentsManifest, loadTemplate } from './manifest.mjs'
import { confirm } from './logger.mjs'

function mapTargetFile(target, projectKind) {
  if (target.startsWith('component:')) {
    const fileName = target.slice('component:'.length)
    const base = projectKind === 'nuxt' ? 'components/gk' : 'src/components/gk'
    return join(base, fileName)
  }
  return target
}

async function applyVueViteCssImports(cwd, options) {
  const mainCandidates = [join(cwd, 'src/main.ts'), join(cwd, 'src/main.js')]
  for (const path of mainCandidates) {
    const existing = await readText(path)
    if (existing === null) continue
    let next = ensureLine(existing, "import 'god-kit/tokens.css'")
    next = ensureLine(next, "import 'god-kit/vue.css'")
    if (next === existing) return { status: 'unchanged', path }
    if (!options.dryRun) {
      await writeFile(path, next, 'utf8')
    }
    return { status: 'updated', path }
  }
  return { status: 'skipped', reason: 'No src/main.ts or src/main.js file found.' }
}

function ensureNuxtCssEntries(configSource) {
  if (configSource.includes('god-kit/tokens.css') && configSource.includes('god-kit/vue.css')) {
    return configSource
  }

  const cssArrayPattern = /css\s*:\s*\[([\s\S]*?)\]/m
  if (cssArrayPattern.test(configSource)) {
    return configSource.replace(cssArrayPattern, (full, inner) => {
      let nextInner = inner
      if (!nextInner.includes('god-kit/tokens.css')) {
        nextInner = `${nextInner}${nextInner.trim() ? ', ' : ''}'god-kit/tokens.css'`
      }
      if (!nextInner.includes('god-kit/vue.css')) {
        nextInner = `${nextInner}${nextInner.trim() ? ', ' : ''}'god-kit/vue.css'`
      }
      return `css: [${nextInner}]`
    })
  }

  const defineNuxtPattern = /defineNuxtConfig\(\s*\{/m
  if (!defineNuxtPattern.test(configSource)) return null

  return configSource.replace(defineNuxtPattern, (match) => {
    return `${match}\n  css: ['god-kit/tokens.css', 'god-kit/vue.css'],`
  })
}

async function applyNuxtCss(cwd, options) {
  const candidates = ['nuxt.config.ts', 'nuxt.config.js', 'nuxt.config.mjs']
  for (const rel of candidates) {
    const path = join(cwd, rel)
    const existing = await readText(path)
    if (existing === null) continue
    const next = ensureNuxtCssEntries(existing)
    if (next === null) {
      return { status: 'skipped', reason: `Could not safely patch ${rel}; please add CSS manually.` }
    }
    if (next === existing) return { status: 'unchanged', path }
    if (!options.dryRun) {
      await writeFile(path, next, 'utf8')
    }
    return { status: 'updated', path }
  }
  return { status: 'skipped', reason: 'No nuxt.config.ts/js/mjs file found.' }
}

function getMissingDeps(project, requested) {
  const deps = {
    ...(project.packageJson?.dependencies ?? {}),
    ...(project.packageJson?.devDependencies ?? {}),
  }
  return requested.filter((dep) => !deps[dep])
}

export async function runAddCommand(componentName, options, logger) {
  const cwd = resolve(options.cwd)
  const project = await detectProject(cwd)

  if (project.kind === 'unknown') {
    throw new Error('Unsupported project type. Expected Vue Vite or Nuxt project.')
  }

  const manifest = await loadComponentsManifest()
  const component = manifest.components[componentName]
  if (!component) {
    throw new Error(`Unknown component "${componentName}".`)
  }

  logger.step(`Detected project: ${project.kind} (${project.packageManager})`)
  logger.step(`Adding component: ${componentName}`)

  const writeResults = []
  for (const file of component.files) {
    const template = await loadTemplate(file.template)
    const relativeTarget = mapTargetFile(file.target, project.kind)
    const absoluteTarget = join(cwd, relativeTarget)
    const result = await writePlannedFile(absoluteTarget, template, options)
    writeResults.push({ ...result, relativeTarget })
  }

  const conflicts = writeResults.filter((r) => r.status === 'conflict')
  if (conflicts.length) {
    const list = conflicts.map((c) => `- ${c.relativeTarget}`).join('\n')
    throw new Error(`Conflicting files found. Re-run with --force to overwrite:\n${list}`)
  }

  if (project.kind === 'vue-vite') {
    const css = await applyVueViteCssImports(cwd, options)
    if (css.status === 'updated') logger.success(`Updated ${css.path}`)
    else if (css.status === 'skipped') logger.warn(css.reason)
  } else if (project.kind === 'nuxt') {
    const css = await applyNuxtCss(cwd, options)
    if (css.status === 'updated') logger.success(`Updated ${css.path}`)
    else if (css.status === 'skipped') logger.warn(css.reason)
  }

  for (const result of writeResults) {
    if (result.status === 'created') logger.success(`Created ${result.relativeTarget}`)
    if (result.status === 'overwritten') logger.success(`Overwrote ${result.relativeTarget}`)
    if (result.status === 'unchanged') logger.info(`Unchanged ${result.relativeTarget}`)
  }

  const missing = getMissingDeps(project, component.deps ?? [])
  if (!missing.length) {
    logger.info('Dependencies already satisfied.')
  } else if (options.dryRun) {
    logger.info(`Dry run: would install ${missing.join(', ')}`)
  } else {
    const shouldInstall = options.yes ? true : await confirm(`Install dependencies (${missing.join(', ')})?`)
    if (shouldInstall) {
      await installDependencies(project.packageManager, missing, cwd, logger)
    } else {
      logger.warn(`Skipped dependency install. Run manually: ${missing.join(' ')}`)
    }
  }

  logger.success('Done. Import your generated component from components/gk/GkButton.vue (Nuxt) or src/components/gk/GkButton.vue (Vite).')
}
