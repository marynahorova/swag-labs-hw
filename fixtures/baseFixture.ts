import { test as base } from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage";
import { CheckoutStepOnePage } from "../pages/checkoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/checkoutStepTwoPage";
import { InventoryPage } from "../pages/inventoryPage";
import { LoginPage } from "../pages/loginPage";
import { userData } from "../testData";

type MyFixture = {
  cartPage: CartPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  before: void;
  after: void;
  username: string;
  password: string;
};

export const test = base.extend<MyFixture>({
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  username: undefined,

  password: undefined,

  before: [
    async ({ loginPage, username, password }, use) => {
      await loginPage.openLoginPage();
      await loginPage.loginUser(username, password);
      await use();
    },
    { auto: true },
  ],
});
