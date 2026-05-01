import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')

await mkdir(join(dist, 'tailwind'), { recursive: true })
await mkdir(join(dist, 'bridge'), { recursive: true })
await copyFile(join(root, 'src/tokens/tailwind-preset.d.ts'), join(dist, 'tailwind/preset.d.ts'))
await copyFile(join(root, 'src/tokens/tokens.css'), join(dist, 'tokens.css'))
await copyFile(
  join(root, 'src/bridge/vuetify-bridge.css'),
  join(dist, 'bridge/vuetify-bridge.css')
)
