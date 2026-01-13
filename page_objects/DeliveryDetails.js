import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page){
        this.page = page

        this.firstNameField = page.locator('[data-qa="delivery-first-name"]') 
        this.lastNameField = page.locator('[data-qa="delivery-last-name"]')
        this.streetAdressField = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeField = page.locator('[data-qa="delivery-postcode"]')
        this.cityField = page.locator('[data-qa="delivery-city"]')
        this.countryDropDownButton = page.locator('[data-qa="country-dropdown"]')
        this.saveAdressForNextTimeButton = page.locator('[data-qa="save-address-button"]')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
        this.yourSavedAddressesContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedPostcode = page.locator('[data-qa="saved-address-postcode"]') 
        this.savedCity = page.locator('[data-qa="saved-address-city"]')
        this.savedCountry = page.locator('[data-qa="saved-address-country"]')
    }

    fillDeliveryDetailsForm = async(userDetails) => {
        await this.firstNameField.waitFor()
        await this.firstNameField.fill(userDetails.firstName)
        await this.lastNameField.waitFor()
        await this.lastNameField.fill(userDetails.lastName)
        await this.streetAdressField.waitFor()
        await this.streetAdressField.fill(userDetails.street)
        await this.postcodeField.waitFor()
        await this.postcodeField.fill(userDetails.postcode)
        await this.cityField.waitFor()
        await this.cityField.fill(userDetails.city)
        await this.countryDropDownButton.waitFor()
        await this.countryDropDownButton.selectOption(userDetails.country)        
    }

    saveDetails = async() => {
        const addressCountBeforeSaving = await this.yourSavedAddressesContainer.count()
        await this.saveAdressForNextTimeButton.waitFor()
        await this.saveAdressForNextTimeButton.click()                
        await expect(this.yourSavedAddressesContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.savedFirstName.first().waitFor()
        expect(await this.savedFirstName.first().innerText()).toBe(await this.firstNameField.inputValue())

        await this.savedLastName.first().waitFor()
        expect(await this.savedLastName.first().innerText()).toBe(await this.lastNameField.inputValue())

        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetAdressField.inputValue())

        await this.savedPostcode.first().waitFor()
        expect(await this.savedPostcode.first().innerText()).toBe(await this.postcodeField.inputValue())

        await this.savedCity.first().waitFor()
        expect(await this.savedCity.first().innerText()).toBe(await this.cityField.inputValue())

        await this.savedCountry.first().waitFor()
        expect(await this.savedCountry.first().innerText()).toBe(await this.countryDropDownButton.inputValue())            
    }

    continueToPayment = async() => {        
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })              
    }
}