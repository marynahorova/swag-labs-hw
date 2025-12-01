import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  // Locators
  private inventoryItem: Locator = this.page.getByTestId("inventory-item");
  private inventoryItemName: Locator = this.page.getByTestId(
    "inventory-item-name"
  );
  private removeFromCartBtn = (item: Locator) =>
    item.getByRole("button", { name: "Remove" });
  private itemPrice = (item: Locator) =>
    item.getByTestId("inventory-item-price");
  private checkoutBtn: Locator = this.page.getByTestId("checkout");
  private continueShoppingBtn: Locator =
    this.page.getByTestId("continue-shopping");

  //Methods
  openCartPage() {
    this.page.goto("/cart.html");
  }

  async removeFromCartByTitle(titles: string | string[]): Promise<void> {
    const items = Array.isArray(titles) ? titles : [titles];

    for (const title of items) {
      const item = this.inventoryItem.filter({
        has: this.inventoryItemName.filter({ hasText: title }),
      });

      await this.removeFromCartBtn(item).click();
    }
  }

  async getPriceByTitle(titles: string | string[]): Promise<string[]> {
    const items = Array.isArray(titles) ? titles : [titles];
    const prices: string[] = [];

    for (const title of items) {
      const item = this.inventoryItem.filter({
        has: this.inventoryItemName.filter({ hasText: title }),
      });

      prices.push(await this.itemPrice(item).innerText());
    }

    return prices;
  }

  async clickCheckoutBtn() {
    await this.checkoutBtn.click();
  }

  async clickContinueShoppingBtn() {
    await this.continueShoppingBtn.click();
  }
}
