import { expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutCompletePage extends BasePage {
  //Locators
  private completeOrderText: Locator = this.page.getByTestId("complete-header");

  //Methods
  async verifyCompletedOrderText() {
    await expect(this.completeOrderText).toHaveText(
      "Thank you for your order!"
    );
  }
}
