import { test, expect } from "@playwright/test"

test.skip("Product Page Add to Basket", async ({ page }) => {
    await page.goto("/")    

    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const checkOutButton = page.getByRole('link', { name: 'Checkout' })
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    const continueToCheckoutBtn = page.getByRole('button', { name: 'Continue to Checkout' })
    const firstItemText = page.getByText('Astronaut dabbing')

    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText("0")
    await addToBasketButton.click()
    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")

    await checkOutButton.waitFor()
    await checkOutButton.click()
    await continueToCheckoutBtn.waitFor()
    await expect(basketCounter).toHaveText("1")
    await expect(continueToCheckoutBtn).toBeVisible()
    await expect(firstItemText).toHaveText("Astronaut dabbing")
    await page.waitForURL("/basket")
})