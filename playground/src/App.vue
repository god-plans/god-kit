<script setup lang="ts">
import { GkButton, GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const passwordError = ref('')

function onSubmit(e: Event) {
  e.preventDefault()
  passwordError.value = password.value.length < 4 ? 'Use at least 4 characters.' : ''
}

function toggleDark() {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div class="gk-play">
    <header class="gk-play__header">
      <h1>God Kit playground</h1>
      <p class="gk-play__sub">
        Imports <code>god-kit/vue</code> from source via Vite alias (see
        <code>playground/vite.config.ts</code>).
      </p>
      <GkButton type="button" variant="secondary" size="sm" @click="toggleDark">
        Toggle dark
      </GkButton>
    </header>

    <main class="gk-play__main">
      <section class="gk-play__card">
        <h2>Form</h2>
        <form class="gk-play__form" @submit="onSubmit">
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
        </form>
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
