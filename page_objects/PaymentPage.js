import { expect } from "@playwright/test"
import { paymentDetails } from "../data/paymentDetails"

export class PaymentPage {
    constructor (page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeField = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscountButton = page.getByRole('button', { name: 'Submit discount' })
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.totalDiscountedPrice = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwnerField = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberField = page.locator('[data-qa="credit-card-number"]')
        this.validUntilField = page.locator('[data-qa="valid-until"]')
        this.creditCardCvcField = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.getByRole('button', { name: 'Pay' })
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountCodeField.waitFor()

        // option 1 for laggy input field using fill() with await expect()
        await this.discountCodeField.fill(code)
        await expect(this.discountCodeField).toHaveValue(code)

        // option 2 for laggy inputs: slow typing        
        // await this.discountCodeField.focus()
        // await this.page.keyboard.type(code, {delay: 1000}) 
        // expect(await this.discountCodeField.inputValue()).toBe(code)
        
        await expect(this.discountActivatedMessage).toBeHidden()
        await expect(this.totalDiscountedPrice).toBeHidden()
        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await this.discountActivatedMessage.waitFor()
        await expect(this.discountActivatedMessage).toBeVisible()
        await this.totalDiscountedPrice.waitFor()
        await expect(this.totalDiscountedPrice).toBeVisible()

        const totalDiscountValue = await this.totalDiscountedPrice.innerText()
        const totalDiscountValueOnlyStringNumber = totalDiscountValue.replace("$", "") 
        const totalDiscountValueOnlyNumber = parseInt(totalDiscountValueOnlyStringNumber, 10)  
        
        await this.totalPrice.waitFor()
        const totalValue = await this.totalPrice.innerText()
        const totalValueOnlyStringNumber = totalValue.replace("$", "") 
        const totalValueOnlyNumber = parseInt(totalValueOnlyStringNumber, 10)
        expect(totalDiscountValueOnlyNumber).toBeLessThanOrEqual(totalValueOnlyNumber)       
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwnerField.waitFor()
        await this.creditCardOwnerField.fill(paymentDetails.creditCardOwner)
        await this.creditCardNumberField.waitFor()
        await this.creditCardNumberField.fill(paymentDetails.creditCardNumber)
        await this.validUntilField.waitFor()
        await this.validUntilField.fill(paymentDetails.validUntilDate)
        await this.creditCardCvcField.waitFor()
        await this.creditCardCvcField.fill(paymentDetails.creditCardCVC)                
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, { Timeout: 3000 })        
    }
}