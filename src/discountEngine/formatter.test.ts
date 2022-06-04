import {
  randAddress,
  randEmail,
  randFullName,
  randPhoneNumber,
} from "@ngneat/falso";

import { roundPriceUpTwoDecimalPlaces } from "./formatter";
import { Customer, Purchase } from "./types";

describe("roundPriceUpTwoDecimalPlaces()", () => {
  const customer: Customer = {
    name: randFullName(),
    email: randEmail(),
    phoneNumber: randPhoneNumber(),
    deliveryAddress: randAddress().street,
  };

  const purchase: Purchase = {
    price: 100.234,
    customer: customer,
    productSKU: 'ads',
    description: "adsadasd"
  }

  it("rounds up to two decimal places", () => {
    const roundUpPurchase = roundPriceUpTwoDecimalPlaces(purchase)
    expect(roundUpPurchase.price).toBe(100.24)
  });
});
