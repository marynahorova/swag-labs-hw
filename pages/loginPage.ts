import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  // Locators
  private userNameInput: Locator = this.page.getByTestId("username");
  private passwordInput: Locator = this.page.getByTestId("password");
  private loginBtn: Locator = this.page.getByTestId("login-button");

  // Methods

  async openLoginPage() {
    await this.page.goto("/");
  }
  private async fillUserName(userName: string) {
    await this.userNameInput.fill(userName);
  }

  private async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  private async clickLoginBtn() {
    await this.loginBtn.click();
  }

  async loginUser(userName, password) {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLoginBtn();
  }
}
