import axe from 'axe-core'
import { expect } from 'vitest'

/**
 * Runs axe on a mounted DOM subtree; fails the test if any a11y violations are reported.
 */
export async function expectNoA11yViolations(root: HTMLElement) {
  const results = await axe.run(root, {
    rules: {
      // jsdom has no canvas; color-contrast is better checked in browser E2E
      'color-contrast': { enabled: false },
    },
  })
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
}
