import { test, expect } from "@playwright/test";

test ('Main page', async ({page})=> {
    await page.goto('/');
    const getAddProductButton = page.locator('[data-qa="product-button"]').first()
    const headerBasketCount = page.locator('[data-qa="header-basket-count"]');
    await expect(getAddProductButton).toHaveText("Add to Basket");
    await expect(headerBasketCount).toHaveText("0");
    await getAddProductButton.waitFor()
    await getAddProductButton.click()
    await expect(getAddProductButton).toHaveText("Remove from Basket");
    await expect(headerBasketCount).toHaveText("1");
    const checkoutLink = page.getByRole("link", {name: "Checkout"});
    await checkoutLink.waitFor();
    await checkoutLink.click();
    await page.waitForURL("/basket");

})

 