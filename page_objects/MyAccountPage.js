export class MyAccountPage {
    constructor (page) {
        this.page = page
        this.accountHeading = page.getByRole('heading', { name: 'My Account' }) 
        this.mockingErrorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        await this.page.goto("/my-account")        
    }

    waitForAccountHeading = async () => {
        await this.accountHeading.waitFor()
    }

    waitForErrorMessage = async () => {
        await this.mockingErrorMessage.waitFor()
    }
} 