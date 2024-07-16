import { expect } from '@playwright/test';

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountCodeInput = page.getByPlaceholder("Discount code");
    this.submitDiscount = page.getByRole("button", { name: "Submit discount" });
    this.discountActivatedText = page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.totalValueWithDiscount = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]');
    this.validUntil = page.locator('[data-qa="valid-until"]');
    this.creditCardNumber = page.locator('[data-qa="credit-card-number"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.creditCardCvc = page.locator('[data-qa="credit-card-cvc"]');
  }
  activateDiscount = async () => {
    // await page.pause()
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();

    await this.discountCodeInput.fill(code);
    await expect(this.discountCodeInput).toHaveValue(code);
    await this.submitDiscount.waitFor();
    await this.submitDiscount.click();
    await expect(this.discountActivatedText).toHaveText("Discount activated!");

    const totalValueNumber = Number(
      (await this.totalValue.innerText()).replace("$", "")
    );
    const totalValueWithDiscountNumber = Number(
      (await this.totalValueWithDiscount.innerText()).replace("$", "")
    );
    expect(totalValueNumber).toBeGreaterThan(totalValueWithDiscountNumber);
  };

  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwner.fill(paymentDetails.owner);
    await this.creditCardCvc.fill(paymentDetails.cvc);
    await this.creditCardNumber.fill(paymentDetails.number);
    await this.validUntil.fill(paymentDetails.validUntil);
  };

  completePayment = async () => {
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}