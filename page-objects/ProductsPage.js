import { expect } from '@playwright/test';
import { Navigation } from './Navigation';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.titleCards = page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("/");
  };

  addProductToBasket = async (index) => {
    const navigation = new Navigation(this.page);
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");
    const basketCountBeforeAdding = await navigation.getBasketCount();
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    const basketCountAfterAdding = await navigation.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
  };

  sortedByCheapest = async () => {
    await this.titleCards.first().waitFor();
    await this.sortDropdown.waitFor();
    const productTitlesBeforeSorting = this.titleCards.allInnerTexts();
    await this.sortDropdown.selectOption('price-asc');
    const productTitlesAfterSorting = this.titleCards.allInnerTexts();
    await expect(productTitlesAfterSorting).not.toEqual(
      productTitlesBeforeSorting
    );
  }
}