import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function readText(path) {
  try {
    return await readFile(path, 'utf8')
  } catch {
    return null
  }
}

export function ensureLine(content, line) {
  if (content.includes(line)) return content
  const lines = content.split('\n')
  let insertAt = 0
  while (insertAt < lines.length && lines[insertAt].trim().startsWith('import ')) {
    insertAt += 1
  }
  lines.splice(insertAt, 0, line)
  return lines.join('\n')
}

export async function writePlannedFile(path, content, { force = false, dryRun = false } = {}) {
  const existing = await readText(path)
  if (existing === content) {
    return { status: 'unchanged', path }
  }
  if (existing !== null && !force) {
    return { status: 'conflict', path }
  }
  if (!dryRun) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content, 'utf8')
  }
  return { status: existing === null ? 'created' : 'overwritten', path }
}
