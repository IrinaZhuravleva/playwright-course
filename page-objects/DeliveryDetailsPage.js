import { expect } from '@playwright/test';

export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First name");
    this.lastNameInput = page.getByPlaceholder("Last name");
    this.streetInput = page.getByPlaceholder("Street");
    this.postCodeInput = page.getByPlaceholder("Post code");
    this.cityInput = page.getByPlaceholder("City");
    this.saveAddressButton = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.savedAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
  }

  fillDetails = async (userAddress) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(userAddress.firstName);
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(userAddress.lastName);
    await this.streetInput.waitFor();
    await this.streetInput.fill(userAddress.street);
    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill(userAddress.code);
    await this.cityInput.waitFor();
    await this.cityInput.fill(userAddress.city);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption(userAddress.country);
  };

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await expect(this.savedAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1
    );
  }

}