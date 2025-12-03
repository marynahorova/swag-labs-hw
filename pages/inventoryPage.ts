import { expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SrvRecord } from "dns";

export class InventoryPage extends BasePage {
  // Locators
  private getProductItemLocator(itemName: string): Locator {
    return this.page.locator(`[data-test="inventory-item"]`).filter({
      hasText: itemName,
    });
  }

  private getAddToCartButtonLocator(itemName: string): Locator {
    const itemId = itemName.toLowerCase().replace(/\s+/g, "-");
    return this.page.locator(`[data-test="add-to-cart-${itemId}"]`);
  }

  private getRemoveButtonLocator(itemName: string): Locator {
    const itemId = itemName.toLowerCase().replace(/\s+/g, "-");
    return this.page.locator(`[data-test="remove-${itemId}"]`);
  }

  private getPriceLocator(itemName: string): Locator {
    return this.getProductItemLocator(itemName).locator(
      `[data-test="inventory-item-price"]`
    );
  }

  private cartCounter: Locator = this.page.getByTestId("shopping-cart-badge");

  //Methods

  async addToCartByTitle(itemName: string): Promise<void> {
    await this.getAddToCartButtonLocator(itemName).click();
  }

  async removeFromCartByTitle(itemName: string): Promise<void> {
    await this.getRemoveButtonLocator(itemName).click();
  }

  async getPriceByTitle(itemName: string): Promise<string> {
    const priceText = await this.getPriceLocator(itemName).textContent();
    return priceText?.trim() || "";
  }

  async verifyCartCounterVisibility(
    { isVisible }: { isVisible: boolean },
    count?: string
  ): Promise<void> {
    if (isVisible) {
      if (count !== undefined) {
        await expect(this.cartCounter).toHaveText(count);
      }
    } else {
      await expect(this.cartCounter).not.toBeVisible();
    }
  }
}
