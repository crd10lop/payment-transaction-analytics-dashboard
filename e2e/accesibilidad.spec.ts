import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('la página principal no tiene violaciones de accesibilidad críticas', async ({
  page,
}) => {
  await page.goto('/')

  const resultados = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()

  resultados.violations.forEach((violacion) =>
    console.error(`[axe] ${violacion.id}: ${violacion.description}`),
  )

  expect(resultados.violations).toEqual([])
})
