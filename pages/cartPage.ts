import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  // Locators
  private getProductItemLocator(itemName: string): Locator {
    return this.page.locator(`[data-test="inventory-item"]`).filter({
      hasText: itemName,
    });
  }
  private getRemoveButtonLocator(itemName: string): Locator {
    const itemId = itemName.toLowerCase().replace(/\s+/g, "-");
    return this.page.locator(`[data-test="remove-$itemId}"]`);
  }

  private getPriceLocator(itemName: string): Locator {
    return this.getProductItemLocator(itemName).locator(
      `[data-test="inventory-item-price"]`
    );
  }
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

  async removeFromCartByTitle(itemName: string): Promise<void> {
    await this.getRemoveButtonLocator(itemName).click();
  }

  async getPriceByTitle(itemName: string): Promise<string> {
    const priceText = await this.getPriceLocator(itemName).textContent();
    return priceText?.trim() || "";
  }

  async clickCheckoutBtn() {
    await this.checkoutBtn.click();
  }

  async clickContinueShoppingBtn() {
    await this.continueShoppingBtn.click();
  }
}
