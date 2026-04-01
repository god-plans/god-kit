import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { detectProject } from '../../cli/lib/project.mjs'

async function createTempDir(prefix) {
  return mkdtemp(join(tmpdir(), prefix))
}

describe('project detection', () => {
  it('detects nuxt projects', async () => {
    const cwd = await createTempDir('gk-nuxt-')
    await writeFile(join(cwd, 'nuxt.config.ts'), 'export default defineNuxtConfig({})', 'utf8')
    await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'nuxt-app' }), 'utf8')
    const project = await detectProject(cwd)
    expect(project.kind).toBe('nuxt')
  })

  it('detects vue vite projects', async () => {
    const cwd = await createTempDir('gk-vite-')
    await mkdir(join(cwd, 'src'), { recursive: true })
    await writeFile(join(cwd, 'vite.config.ts'), 'export default {}', 'utf8')
    await writeFile(join(cwd, 'src/main.ts'), 'console.log("x")', 'utf8')
    await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'vite-app' }), 'utf8')
    const project = await detectProject(cwd)
    expect(project.kind).toBe('vue-vite')
  })
})
