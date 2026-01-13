import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {
    constructor(page) {
        this.page = page
        
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutButton = page.getByRole('link', { name: 'Checkout' })
        this.mobieBurgerButton = page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        if (! isDesktopViewport(this.page)) {
            await this.mobieBurgerButton.waitFor()
            await this.mobieBurgerButton.click()
        }
        await this.checkOutButton.waitFor()
        await this.checkOutButton.click()
        await this.page.waitForURL("/basket")
    }
}