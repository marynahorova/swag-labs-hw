import { test } from "../fixtures/baseFixture";
import { LoginPage } from "../pages/loginPage";
import { InventoryItems, userData } from "../testData";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutStepOnePage } from "../pages/checkoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/checkoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage";

test.describe(
  "Swag Lab Tests with Fixtures",
  { tag: "@regression" },
  async () => {
    test.use({
      username: userData.standardUser.username,
      password: userData.standardUser.password,
    });

    test("SL-001 Verify that User can add item to the cart (with fixture)", async ({
      inventoryPage,
    }) => {
      await inventoryPage.addToCartByTitle(
        InventoryItems.SauceLabsBackpack.title
      );
      await inventoryPage.getPriceByTitle(
        InventoryItems.SauceLabsBackpack.title
      );
      await inventoryPage.verifyCartCounterVisibility({ isVisible: true }, "1");
    });

    test("SL-002 Verify that User can remove item from the cart (with fixture)", async ({
      inventoryPage,
    }) => {
      await inventoryPage.addToCartByTitle(
        InventoryItems.SauceLabsBackpack.title
      );
      await inventoryPage.removeFromCartByTitle(
        InventoryItems.SauceLabsBackpack.title
      );
      await inventoryPage.verifyCartCounterVisibility({ isVisible: false });
    });

    test("SL-003 Verify successful checkout (with fixture)", async ({
      cartPage,
      checkoutCompletePage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
      inventoryPage,
    }) => {
      await inventoryPage.addToCartByTitle("Sauce Labs Bike Light");
      await cartPage.openCartPage();
      await cartPage.clickCheckoutBtn();
      await checkoutStepOnePage.fillCheckoutForm(
        "FirstName",
        "LastName",
        "123"
      );
      await checkoutStepOnePage.clickContinueBtn();
      await checkoutStepTwoPage.clickFinishBtn();
      await checkoutCompletePage.verifyCompletedOrderText();
    });
  }
);
