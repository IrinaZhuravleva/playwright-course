// import * as dotenv from "dotenv"
// dotenv.config()
import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js";
import { adminDetails } from "./../data/userDetail.js";

test.only("My Account using cookie injection and mocking network request", async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

    await page.route(
      "**/api/user**", async (route, request) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({message: "PLAYWRITH ERROR FROM MOCKING"}),
        })
      }
    );

    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate(
      ([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
      },
      [loginToken]
    )
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})