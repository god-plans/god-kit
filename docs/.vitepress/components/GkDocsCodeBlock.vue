<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    code: string
    language?: string
    label?: string
    collapsed?: boolean
    collapsedLines?: number
  }>(),
  {
    language: 'vue',
    label: 'Copy code',
    collapsed: true,
    collapsedLines: 14,
  }
)

const copied = ref(false)
const expanded = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

const trimmedCode = computed(() => props.code.trim())
const lineCount = computed(() => trimmedCode.value.split('\n').length)
const canCollapse = computed(() => props.collapsed && lineCount.value > props.collapsedLines)
const isCollapsed = computed(() => canCollapse.value && !expanded.value)
const highlightedCode = computed(() => highlightCode(trimmedCode.value))
const preStyle = computed(() =>
  isCollapsed.value
    ? { '--gk-docs-code-collapsed-lines': String(props.collapsedLines) }
    : undefined
)

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlightText(s: string) {
  return escapeHtml(s).replace(
    /\b(import|from|const|let|ref|reactive|computed|type|interface|function|return|defineProps|withDefaults)\b/g,
    '<span class="gk-docs-token gk-docs-token--keyword">$1</span>'
  )
}

function highlightTag(tag: string) {
  let out = ''
  let i = 0
  while (i < tag.length) {
    const ch = tag[i]
    if (ch === '<') {
      const closing = tag[i + 1] === '/'
      const start = closing ? i + 2 : i + 1
      let j = start
      while (j < tag.length && /[\w:-]/.test(tag[j])) j++
      out += closing ? '&lt;/' : '&lt;'
      out += `<span class="gk-docs-token gk-docs-token--tag">${escapeHtml(tag.slice(start, j))}</span>`
      i = j
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch
      let j = i + 1
      while (j < tag.length) {
        if (tag[j] === '\\') {
          j += 2
          continue
        }
        if (tag[j] === quote) {
          j++
          break
        }
        j++
      }
      out += `<span class="gk-docs-token gk-docs-token--string">${escapeHtml(tag.slice(i, j))}</span>`
      i = j
      continue
    }
    if (/[:@#\w-]/.test(ch)) {
      let j = i + 1
      while (j < tag.length && /[:@#\w-]/.test(tag[j])) j++
      const word = tag.slice(i, j)
      const next = tag.slice(j).trimStart()[0]
      out += next === '='
        ? `<span class="gk-docs-token gk-docs-token--attr">${escapeHtml(word)}</span>`
        : escapeHtml(word)
      i = j
      continue
    }
    out += escapeHtml(ch)
    i++
  }
  return out
}

function highlightCode(code: string) {
  let out = ''
  let i = 0
  while (i < code.length) {
    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4)
      const j = end === -1 ? code.length : end + 3
      out += `<span class="gk-docs-token gk-docs-token--comment">${escapeHtml(code.slice(i, j))}</span>`
      i = j
      continue
    }
    if (code[i] === '<') {
      const end = code.indexOf('>', i + 1)
      if (end !== -1) {
        out += highlightTag(code.slice(i, end + 1))
        i = end + 1
        continue
      }
    }
    const next = code.indexOf('<', i + 1)
    const j = next === -1 ? code.length : next
    out += highlightText(code.slice(i, j))
    i = j
  }
  return out
}

async function copyCode() {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return
  await navigator.clipboard.writeText(trimmedCode.value)
  copied.value = true
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <div class="gk-docs-code-block">
    <div class="gk-docs-code-block__bar">
      <span class="gk-docs-code-block__lang">{{ language }}</span>
      <button
        class="gk-docs-code-block__copy"
        type="button"
        :aria-label="label"
        @click="copyCode"
      >
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <div
      class="gk-docs-code-block__body"
      :class="{ 'gk-docs-code-block__body--collapsed': isCollapsed }"
      :style="preStyle"
    >
      <pre class="gk-docs-code-block__pre"><code v-html="highlightedCode" /></pre>
      <div v-if="isCollapsed" class="gk-docs-code-block__fade" aria-hidden="true">
        ...
      </div>
    </div>
    <button
      v-if="canCollapse"
      class="gk-docs-code-block__toggle"
      type="button"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Collapse code' : `Show full code (${lineCount} lines)` }}
    </button>
  </div>
</template>

<style scoped>
.gk-docs-code-block {
  overflow: hidden;
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
  background: color-mix(in srgb, var(--gk-color-bg) 86%, var(--gk-color-surface));
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
}

.gk-docs-code-block__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gk-space-3);
  padding: var(--gk-space-2) var(--gk-space-3);
  border-bottom: 1px solid var(--gk-color-border);
  background: color-mix(in srgb, var(--gk-color-on-surface) 4%, transparent);
}

.gk-docs-code-block__lang {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gk-color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.gk-docs-code-block__copy {
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-sm);
  background: var(--gk-color-surface);
  color: var(--gk-color-text);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  padding: 0.375rem 0.625rem;
  cursor: pointer;
}

.gk-docs-code-block__copy:hover,
.gk-docs-code-block__toggle:hover {
  border-color: var(--gk-color-border-strong);
  color: var(--gk-color-primary);
}

.gk-docs-code-block__copy:focus-visible,
.gk-docs-code-block__toggle:focus-visible {
  outline: var(--gk-focus-ring-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-docs-code-block__body {
  position: relative;
}

.gk-docs-code-block__body--collapsed {
  max-height: calc(var(--gk-docs-code-collapsed-lines, 14) * 1.55em + 2rem);
  overflow: hidden;
}

.gk-docs-code-block__pre {
  margin: 0;
  padding: var(--gk-space-4);
  overflow: auto;
  font-size: 0.8125rem;
  line-height: 1.55;
}

.gk-docs-code-block__pre code {
  color: var(--gk-color-text);
  white-space: pre;
}

.gk-docs-code-block__fade {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 3.25rem;
  padding-bottom: var(--gk-space-2);
  color: var(--gk-color-text-muted);
  font-weight: 700;
  letter-spacing: 0.12em;
  background: linear-gradient(
    to bottom,
    transparent,
    color-mix(in srgb, var(--gk-color-bg) 92%, var(--gk-color-surface))
  );
  pointer-events: none;
}

.gk-docs-code-block__toggle {
  width: 100%;
  border: 0;
  border-top: 1px solid var(--gk-color-border);
  background: color-mix(in srgb, var(--gk-color-on-surface) 3%, transparent);
  color: var(--gk-color-text);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.625rem;
  cursor: pointer;
}

:deep(.gk-docs-token--tag) {
  color: var(--gk-color-primary);
}

:deep(.gk-docs-token--attr) {
  color: var(--gk-color-info);
}

:deep(.gk-docs-token--string) {
  color: var(--gk-color-success);
}

:deep(.gk-docs-token--keyword) {
  color: var(--gk-color-warning);
  font-weight: 600;
}

:deep(.gk-docs-token--comment) {
  color: var(--gk-color-text-muted);
  font-style: italic;
}
</style>
