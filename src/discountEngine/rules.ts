import { PurchaseRule, Purchase } from "./types";

export const withBigSpenderDiscountRule: PurchaseRule = (purchase: Purchase) =>
  purchase.price > 10000
    ? { ...purchase, price: purchase.price - purchase.price * 0.05 }
    : purchase;

export const withSweetDigsDiscount: PurchaseRule = (purchase: Purchase) =>
  purchase.customer.deliveryAddress.includes("Barangaroo Sydney")
    ? { ...purchase, price: purchase.price - purchase.price * 0.01 }
    : purchase;

export const withFooBarSku: PurchaseRule = (purchase: Purchase) =>
  purchase.productSKU.includes("foo") || purchase.productSKU.includes("bar")
    ? { ...purchase, price: purchase.price - 100 }
    : purchase;
