import { expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SrvRecord } from "dns";

export class InventoryPage extends BasePage {
  // Locators
  private inventoryItem: Locator = this.page.getByTestId("inventory-item");
  private inventoryItemName: Locator = this.page.getByTestId(
    "inventory-item-name"
  );
  private addToCartBtn = (item: Locator) =>
    item.getByRole("button", { name: "Add to cart" });
  private removeFromCartBtn = (item: Locator) =>
    item.getByRole("button", { name: "Remove" });
  private itemPrice = (item: Locator) =>
    item.getByTestId("inventory-item-price");
  private cartCounter: Locator = this.page.getByTestId("shopping-cart-badge");

  //Methods

  async addToCartByTitle(titles: string | string[]): Promise<void> {
    const items = Array.isArray(titles) ? titles : [titles];

    for (const title of items) {
      const item = this.inventoryItem.filter({
        has: this.inventoryItemName.filter({ hasText: title }),
      });

      await this.addToCartBtn(item).click();
    }
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

      const price = await this.itemPrice(item).innerText();

      prices.push(price);
    }

    return prices;
  }

  async verifyCartCounterVisibility(
    { isVisible }: { isVisible: boolean },
    count?: string
  ): Promise<void> {
    if (isVisible) {
      if (count !== undefined) {
        await expect(this.cartCounter).toHaveText(count);
      } else {
        await expect(this.cartCounter).toBeVisible();
      }
    } else {
      await expect(this.cartCounter).not.toBeVisible();
    }
  }
}
