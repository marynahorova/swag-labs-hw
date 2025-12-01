import test from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryItems, user } from "../testData";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutStepOnePage } from "../pages/checkoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/checkoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage";

test.describe("Swag Lab Tests", { tag: "@regression" }, async () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.loginUser(user.username, user.password);
  });
  test("SL-001 Verify that User can add item to the cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addToCartByTitle([
      InventoryItems.SauceLabsBackpack.title,
      InventoryItems.SauceLabsBikeLight.title,
    ]);
    await inventoryPage.getPriceByTitle([
      InventoryItems.SauceLabsBackpack.title,
      InventoryItems.SauceLabsBikeLight.title,
    ]);
    await inventoryPage.verifyCartCounterVisibility({ isVisible: true }, "2");
  });

  test("SL-002 Verify that User can remove item from the cart", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addToCartByTitle(
      InventoryItems.SauceLabsBackpack.title
    );
    await inventoryPage.removeFromCartByTitle(
      InventoryItems.SauceLabsBackpack.title
    );
    await inventoryPage.verifyCartCounterVisibility({ isVisible: false });
  });

  test("SL-003 Verify successful checkout", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await inventoryPage.addToCartByTitle("Sauce Labs Bike Light");
    await cartPage.openCartPage();
    await cartPage.clickCheckoutBtn();
    await checkoutStepOnePage.fillFirstName("Name");
    await checkoutStepOnePage.fillLastName("Test");
    await checkoutStepOnePage.fillZipCode("123");
    await checkoutStepOnePage.clickContinueBtn();
    await checkoutStepTwoPage.clickFinishBtn();
    await checkoutCompletePage.verifyCompletedOrderText();
  });
});
