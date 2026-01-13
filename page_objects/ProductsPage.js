import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "../utils/isDesktopViewport.js"

export class ProdutsPage {
    constructor(page) {
        this.page = page
        
        this.addButtons = page.locator('[data-qa="product-button"]')  
        this.sortDropDownBtn = page.locator('[data-qa="sort-dropdown"]')   
        this.productTitleList = page.locator('[data-qa="product-title"]')   
    }
    
    visit = async () => {
        await this.page.goto("/")
    }    

    addProductToBasket = async (index) => { 
        const specificAddButton = this.addButtons.nth(index)                
        await  specificAddButton.waitFor() 
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)

        let basketCountBeforeAdding // undefined
        if (isDesktopViewport(this.page)) {
          basketCountBeforeAdding = await navigation.getBasketCount()  
        }                
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")

        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }        
    }

    sortByCheapest = async () => {
        await this.sortDropDownBtn.waitFor()
        await this.productTitleList.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitleList.allInnerTexts()
        await this.sortDropDownBtn.selectOption("price-asc")
        const productTitleListAfterSorting = await this.productTitleList.allInnerTexts()
        expect(productTitleListAfterSorting).not.toEqual(productTitlesBeforeSorting)        
    }
}