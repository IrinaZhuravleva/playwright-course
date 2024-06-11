import { expect } from '@playwright/test';
import { timeout } from '../playwright.config';

export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First name");
    this.lastNameInput = page.getByPlaceholder("Last name");
    this.streetInput = page.getByPlaceholder("Street");
    this.postcodeInput = page.getByPlaceholder("Post code");
    this.cityInput = page.getByPlaceholder("City");
    this.saveAddressButton = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.savedAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.savedAddressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAddressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostcode = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator(
      '[data-qa="saved-address-country"]'
    );
    this.continueToPaymentButton = page.getByRole("button", {
      name: "Continue to payment",
    });
  }

  fillDetails = async (userAddress) => {
    const fields = [
      { input: this.firstNameInput, value: userAddress.firstName },
      { input: this.lastNameInput, value: userAddress.lastName },
      { input: this.streetInput, value: userAddress.street },
      { input: this.postcodeInput, value: userAddress.code },
      { input: this.cityInput, value: userAddress.city },
      {
        input: this.countryDropdown,
        value: userAddress.country,
        method: "selectOption",
      },
    ];

    for (const { input, value, method = "fill" } of fields) {
      await input.waitFor();
      if (method === "fill") {
        await input.fill(value);
      } else if (method === "selectOption") {
        await input.selectOption(value);
      }
    }
  };

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await expect(this.savedAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1
    );
    await this.savedAddressFirstName.first().waitFor();

    const fields = [
      { saved: this.savedAddressFirstName, input: this.firstNameInput },
      { saved: this.savedAddressLastName, input: this.lastNameInput },
      { saved: this.savedAddressCity, input: this.cityInput },
      { saved: this.savedAddressStreet, input: this.streetInput },
      { saved: this.savedAddressCountry, input: this.countryDropdown },
      { saved: this.savedAddressPostcode, input: this.postcodeInput },
    ];

    for (const field of fields) {
      const savedValue = await field.saved.first().innerText();
      const inputValue = await field.input.inputValue();
      expect(savedValue).toBe(inputValue);
    }
  };

  waitAndClick = async (element) => {
    if (!element) {
      throw new Error("Element is not provided or does not exist.");
    }

    try {
      await element.waitFor(); 
      await element.click();
    } catch (error) {
      console.error("Error during wait and click:", error);
    }
  };

  continueToGetPayment = async () => {
    await this.waitAndClick(this.continueToPaymentButton);
    await this.page.waitForURL(/\/payment/, {
      timeout: 3000,
    });
  };
}