import { test } from "@playwright/test"
import { MyAccountPage } from "../page_objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "./../data/userDetails.js"

// jenkins, CircleCI, TravisCI, Github Actions

test("My Account using cookie injection and mocking network request", async ({ page }) => {
    // Make a request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)    

    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"})
        })
    })
    // Inject the login token into the browser
    const myAccount = new MyAccountPage(page)    
    await myAccount.visit()    
    await page.evaluate(([loginTokenInsideBrowserList]) => {
        document.cookie = "token=" + loginTokenInsideBrowserList
    }, [loginToken]) 
    await myAccount.visit()
    await myAccount.waitForAccountHeading()
    await myAccount.waitForErrorMessage()
})