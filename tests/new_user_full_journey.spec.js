import { test } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid' 
import { ProdutsPage } from './../page_objects/ProductsPage.js'
import { Navigation } from './../page_objects/Navigation.js'
import { Checkout } from '../page_objects/Checkout.js'
import { Login } from '../page_objects/Login.js'
import { Signup } from './../page_objects/Signup.js'
import { DeliveryDetails } from '../page_objects/DeliveryDetails.js'
import { deliveryDetails as userDetails } from '../data/deliveryDetailsOptions.js'
import { PaymentPage } from '../page_objects/PaymentPage.js'
import { paymentDetails } from '../data/paymentDetails.js'

test("New User full end to end journey", async({ page }) => {
    const productsPage = new ProdutsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2) 

    const navigation = new Navigation(page)
    await navigation.goToCheckout() 

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout() 

    const login = new Login(page)
    await login.continueToSignup()        

    const signup = new Signup(page)
    const email = uuidv4() + '@test.com'
    const password = uuidv4() 
    await signup.signupNewUser(email, password)
    
    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDeliveryDetailsForm(userDetails) 
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment()
})