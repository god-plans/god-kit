<script setup lang="ts">
import { GkButton, GkField, GkForm, GkInput } from 'god-kit/vue'
import type { SubmitEventPromise } from 'god-kit/vue'
import type { GkThemeName } from 'god-kit/vue/config'
import { useGkTheme } from 'god-kit/vue/config'
import { computed, ref } from 'vue'

const email = ref('')
const password = ref('')
const passwordError = ref('')

const theme = useGkTheme()

const themeChoice = computed({
  get: () => theme.name.value,
  set: (v: GkThemeName) => theme.change(v),
})

const themeOptions: { value: GkThemeName; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'highContrast', label: 'High contrast' },
  { value: 'system', label: 'System' },
]

function onSubmit(e: SubmitEventPromise) {
  e.then((result) => {
    if (!result.valid) return
    passwordError.value = password.value.length < 4 ? 'Use at least 4 characters.' : ''
  })
}
</script>

<template>
  <div class="gk-play">
    <header class="gk-play__header">
      <h1>God Kit playground</h1>
      <p class="gk-play__sub">
        Imports <code>god-kit/vue</code> from source via Vite alias (see
        <code>playground/vite.config.ts</code>). Theme uses <code>createGkKit</code> +
        <code>useGkTheme()</code>.
      </p>
      <div class="gk-play__theme">
        <label class="gk-play__theme-label" for="gk-play-theme">Theme</label>
        <select id="gk-play-theme" v-model="themeChoice" class="gk-play__theme-select">
          <option v-for="opt in themeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <span class="gk-play__theme-resolved" aria-live="polite">
          Resolved: <strong>{{ theme.resolved }}</strong>
        </span>
      </div>
    </header>

    <main class="gk-play__main">
      <section class="gk-play__card">
        <h2>GkForm</h2>
        <GkForm class="gk-play__form" @submit="onSubmit">
          <template #default>
            <GkField label="Email">
              <GkInput
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@example.com"
              />
            </GkField>

            <GkField label="Password" :error="passwordError">
              <GkInput
                v-model="password"
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="••••••••"
              />
            </GkField>

            <div class="gk-play__actions">
              <GkButton type="submit" variant="primary">
                Sign in
              </GkButton>
              <GkButton
                type="button"
                variant="ghost"
                @click="email = ''; password = ''; passwordError = ''"
              >
                Clear
              </GkButton>
              <GkButton type="button" variant="danger">
                Danger
              </GkButton>
            </div>
          </template>
        </GkForm>
      </section>
    </main>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  min-height: 100%;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.gk-play {
  min-height: 100vh;
  padding: var(--gk-space-6);
  background: var(--gk-color-bg);
  color: var(--gk-color-text);
  font-family: var(--gk-font-sans);
}

.gk-play__header {
  max-width: 32rem;
  margin-bottom: var(--gk-space-6);
}

.gk-play__header h1 {
  margin: 0 0 var(--gk-space-2);
  font-size: 1.5rem;
  font-weight: 700;
}

.gk-play__sub {
  margin: 0 0 var(--gk-space-4);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
  line-height: var(--gk-line-height-normal);
}

.gk-play__sub code {
  font-size: 0.8em;
  padding: 0.1em 0.35em;
  border-radius: var(--gk-radius-sm);
  background: var(--gk-color-surface-elevated);
  border: 1px solid var(--gk-color-border);
}

.gk-play__theme {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gk-space-2) var(--gk-space-4);
  margin-top: var(--gk-space-3);
}

.gk-play__theme-label {
  font-size: var(--gk-font-size-sm);
  font-weight: 600;
}

.gk-play__theme-select {
  min-width: 12rem;
  padding: var(--gk-space-2) var(--gk-space-3);
  border-radius: var(--gk-radius-md);
  border: 1px solid var(--gk-color-border-strong);
  background: var(--gk-color-surface);
  color: var(--gk-color-text);
  font: inherit;
}

.gk-play__theme-resolved {
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}

.gk-play__main {
  max-width: 28rem;
}

.gk-play__card {
  padding: var(--gk-space-6);
  border-radius: var(--gk-radius-lg);
  background: var(--gk-color-surface);
  border: 1px solid var(--gk-color-border);
}

.gk-play__card h2 {
  margin: 0 0 var(--gk-space-4);
  font-size: 1.125rem;
}

.gk-play__form {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-play__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-3);
  margin-top: var(--gk-space-2);
}
</style>
