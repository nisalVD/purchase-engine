import {PurchaseRule} from "./types"

const withBigSpenderDiscountRule: PurchaseRule = (purchase: Purchase) =>
  purchase.price > 1000
    ? { ...purchase, price: purchase.price - purchase.price * 0.05 }
    : purchase;

const withSweetDigsDiscount: PurchaseRule = (purchase: Purchase) =>
  purchase.customer.deliveryAddress.includes("Barangaroo Sydney")
    ? { ...purchase, price: purchase.price - purchase.price * 0.01 }
    : purchase;

const withFooBarSku: PurchaseRule = (purchase: Purchase) =>
  purchase.productSKU.includes("foo") || purchase.productSKU.includes("bar")
    ? { ...purchase, price: purchase.price - 100 }
    : purchase;

const roundUpPurchasePrice: PurchaseRule = (purchase:Purchase) => 
  {...purchase, price: }

