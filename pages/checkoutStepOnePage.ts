import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutStepOnePage extends BasePage {
  // Locators
  private firstNameInput: Locator = this.page.getByTestId("firstName");
  private lastNameInput: Locator = this.page.getByTestId("lastName");
  private zipCodeInput: Locator = this.page.getByTestId("postalCode");
  private continueBtn: Locator = this.page.getByTestId("continue");

  // Methods
  async openCheckoutStepOnePage() {
    await this.page.goto("/checkout-step-one.html");
  }
  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }
  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }
  async fillZipCode(zipCode: string) {
    await this.zipCodeInput.fill(zipCode);
  }
  async clickContinueBtn() {
    await this.continueBtn.click();
  }
}
