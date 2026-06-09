import { test, expect } from '@playwright/test'

test.describe('Dashboard de pagos', () => {
  test('renderiza las 4 tarjetas de métricas', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('metrica-tarjeta')).toHaveCount(4)
  })

  test('renderiza la tabla de pagos con al menos una fila', async ({ page }) => {
    await page.goto('/')
    expect(await page.locator('tbody tr').count()).toBeGreaterThanOrEqual(1)
  })

  test('el filtro de búsqueda reduce los resultados visibles', async ({
    page,
  }) => {
    await page.goto('/')
    const contador = page.getByTestId('contador-resultados')
    await expect(contador).toBeVisible()

    await page.getByTestId('input-busqueda').fill('zzz_sin_coincidencia')
    await expect(contador).toContainText('0 de')
  })

  test('el gráfico de barras está presente en el DOM', async ({ page }) => {
    await page.goto('/')
    expect(
      await page.getByTestId('revenue-chart').locator('svg').count(),
    ).toBeGreaterThanOrEqual(1)
  })
})
