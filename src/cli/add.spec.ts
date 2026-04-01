import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runAddCommand } from '../../cli/lib/add.mjs'

function logger() {
  return {
    info: () => {},
    success: () => {},
    warn: () => {},
    error: () => {},
    step: () => {},
  }
}

async function temp(prefix) {
  return mkdtemp(join(tmpdir(), prefix))
}

describe('add command', () => {
  beforeEach(() => {
    process.env.GK_CLI_SKIP_INSTALL = '1'
  })

  afterEach(() => {
    delete process.env.GK_CLI_SKIP_INSTALL
  })

  it('creates component and injects css in vue vite project', async () => {
    const cwd = await temp('gk-cli-vite-')
    await mkdir(join(cwd, 'src'), { recursive: true })
    await writeFile(join(cwd, 'vite.config.ts'), 'export default {}', 'utf8')
    await writeFile(join(cwd, 'src/main.ts'), "import { createApp } from 'vue'\n", 'utf8')
    await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'app', dependencies: { vue: '^3' } }), 'utf8')

    await runAddCommand('button', { cwd, yes: true, dryRun: false, force: false }, logger())

    const component = await readFile(join(cwd, 'src/components/gk/GkButton.vue'), 'utf8')
    const main = await readFile(join(cwd, 'src/main.ts'), 'utf8')
    expect(component).toContain("import { GkButton } from 'god-kit/vue'")
    expect(main).toContain("import 'god-kit/tokens.css'")
    expect(main).toContain("import 'god-kit/vue.css'")
  })

  it('is idempotent on rerun and supports force overwrite', async () => {
    const cwd = await temp('gk-cli-rerun-')
    await mkdir(join(cwd, 'src/components/gk'), { recursive: true })
    await mkdir(join(cwd, 'src'), { recursive: true })
    await writeFile(join(cwd, 'vite.config.ts'), 'export default {}', 'utf8')
    await writeFile(join(cwd, 'src/main.ts'), "import 'god-kit/tokens.css'\n", 'utf8')
    await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'app' }), 'utf8')
    await writeFile(join(cwd, 'src/components/gk/GkButton.vue'), '<template>old</template>\n', 'utf8')

    await expect(
      runAddCommand('button', { cwd, yes: true, dryRun: false, force: false }, logger())
    ).rejects.toThrow(/Conflicting files/)

    await runAddCommand('button', { cwd, yes: true, dryRun: false, force: true }, logger())
    await runAddCommand('button', { cwd, yes: true, dryRun: false, force: false }, logger())

    const component = await readFile(join(cwd, 'src/components/gk/GkButton.vue'), 'utf8')
    expect(component).toContain('<GkButton')
  })

  it('updates nuxt css config', async () => {
    const cwd = await temp('gk-cli-nuxt-')
    await writeFile(
      join(cwd, 'nuxt.config.ts'),
      "export default defineNuxtConfig({\n  modules: []\n})\n",
      'utf8'
    )
    await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'nuxt-app', dependencies: { nuxt: '^4' } }), 'utf8')
    await runAddCommand('button', { cwd, yes: true, dryRun: false, force: false }, logger())
    const config = await readFile(join(cwd, 'nuxt.config.ts'), 'utf8')
    expect(config).toContain('god-kit/tokens.css')
    expect(config).toContain('god-kit/vue.css')
  })
})
