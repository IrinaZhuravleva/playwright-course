import { expect } from '@playwright/test';
import convertStringToNumber from "../utilities.js";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page.frameLocator(
      '[data-qa="active-discount-container"]'
    ).locator('[data-qa="discount-code"]');
    this.discountCodeInput = page.getByPlaceholder("Discount code");
    this.submitDiscount = page.getByRole("button", { name: "Submit discount" });
    this.discountActivatedText = page.locator(
      '[data-qa="discount-active-message"]'
    )
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.totalValueWithDiscount = page.locator('[data-qa="total-with-discount-value"]');
  }
  activateDiscount = async() => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();

    // Option 1
    await this.discountCodeInput.fill(code)
    // expect(await this.discountCodeInput).toContainText(code);
    await expect(this.discountCodeInput).toHaveValue(code);

    // Option 2
    // await this.discountCodeInput.focus();
    // await this.page.keyboard.type(code, {delay: 1000})
    // expect(await this.discountCodeInput.inputValue()).toBe(code);
   
    await this.submitDiscount.waitFor();
    await this.submitDiscount.click()
    await expect(this.discountActivatedText).toHaveText("Discount activated!");
    // console.log(await this.totalValueWithDiscount.innerText())
   

    const totalValueNumber = Number(
      (await this.totalValue.innerText()).replace("$", "")
    );
    // console.log(totalValueNumber)
    const totalValueWithDiscountNumber = Number(
      (await this.totalValueWithDiscount.innerText()).replace("$", "")
    );
    // const totalValueWithDiscountNumber = convertStringToNumber(this.totalValueWithDiscount)
    // const totalValueNumber = convertStringToNumber(this.totalValue)
    expect(totalValueNumber).toBeGreaterThan(totalValueWithDiscountNumber);
  
  }
}