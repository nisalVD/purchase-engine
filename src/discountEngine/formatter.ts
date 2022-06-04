import { PurchaseRule, Purchase } from "./types";

const roundUp = (num: number, precision: number): number => {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
};

export const roundPriceUpTwoDecimalPlaces: PurchaseRule = (
  purchase: Purchase
) => ({ ...purchase, price: roundUp(purchase.price, 2) });

