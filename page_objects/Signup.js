export class Signup {
    constructor (page) {
        this.page = page

        this.emailField = page.getByRole('textbox', { name: 'E-Mail' })
        this.passwordField = page.getByRole('textbox', { name: 'Password' })
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    signupNewUser = async(email, password) => {
        await this.emailField.waitFor()       
        await this.emailField.fill(email)
        await this.passwordField.waitFor()               
        await this.passwordField.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL('/delivery-details')
    }
}