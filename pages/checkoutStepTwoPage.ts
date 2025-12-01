import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutStepTwoPage extends BasePage {
  //Locators
  private finishBtn: Locator = this.page.getByTestId("finish");
  private cancelBtn: Locator = this.page.getByTestId("cancel");

  //Methods
  async clickFinishBtn() {
    await this.finishBtn.click();
  }

  async clickCancelBtn() {
    await this.cancelBtn.click();
  }
}
