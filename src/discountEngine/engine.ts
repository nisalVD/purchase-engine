import {
  withFooBarSku,
  withSweetDigsDiscount,
  withBigSpenderDiscountRule,
} from "./rules";
import { PurchaseRule, Purchase } from "./types";
import { roundPriceUpTwoDecimalPlaces } from "./formatter";

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
  withFooBarSku,
  roundPriceUpTwoDecimalPlaces
]);

export default defaultPurchaseEngine;
