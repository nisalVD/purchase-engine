import {
  withFooBarSku,
  withSweetDigsDiscount,
  withBigSpenderDiscountRule,
} from "./rules";

export const createPurchaseEngine = (purchaseRules: PurchaseRule[]) => {
  return (initialPurchase: Purchase) => {
    return purchaseRules.reduce((initial, purchaseRule) => {
      return purchaseRule(initial);
    }, initialPurchase);
  };
};

// order matters here
const defaultPurchaseEngine = createPurchaseEngine([
  withBigSpenderDiscountRule,
  withSweetDigsDiscount,
  withFooBarSku
]);

export default defaultPurchaseEngine;
