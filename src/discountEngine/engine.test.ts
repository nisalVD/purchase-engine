import {
  randEmail,
  randFullName,
  randPhoneNumber,
} from "@ngneat/falso";

import { createPurchaseEngine } from "./engine";
import { Customer, Purchase } from "./types";

import {
  withSweetDigsDiscount,
  withBigSpenderDiscountRule,
} from "./rules";

describe("createPurchaseEngine()", () => {
  const customer: Customer = {
    name: randFullName(),
    email: randEmail(),
    phoneNumber: randPhoneNumber(),
    deliveryAddress: "foo, Barangaroo Sydney",
  };

  const purchase: Purchase = {
    price: 10001,
    description: "purchase over 10000",
    productSKU: "SKU",
    customer: customer,
  };

  it("has all specified rules applied", () => {
    const bigSpenderSweetDigsDiscount = createPurchaseEngine([
      withBigSpenderDiscountRule,
      withSweetDigsDiscount,
    ]);

    const discountedPurchase = bigSpenderSweetDigsDiscount(purchase);
    expect(discountedPurchase.price).toBe(9405.9405);
  });

});
