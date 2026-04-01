import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

export async function loadComponentsManifest() {
  const path = join(root, 'manifests/components.json')
  const raw = await readFile(path, 'utf8')
  return JSON.parse(raw)
}

export async function loadTemplate(templatePath) {
  const fullPath = join(root, 'templates', templatePath)
  return readFile(fullPath, 'utf8')
}
