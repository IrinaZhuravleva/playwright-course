import { expect } from '@playwright/test';
import { timeout } from '../playwright.config';

export class Checkout {
  constructor(page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckoutButton = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const allCardsCount = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allItemsInnerText = await this.basketItemPrice.allInnerTexts();
    const justNumbers = allItemsInnerText.map((item) => +item.replace("$", ""));

    const smallestPrice = Math.min(...justNumbers);
    const index = justNumbers.indexOf(smallestPrice);
    const specificRemoveButton = this.basketItemRemoveButton.nth(index);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(allCardsCount - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/gm, { timeout: 3000 });
  }
}