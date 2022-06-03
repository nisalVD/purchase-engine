import {
  randAddress,
  randEmail,
  randFullName,
  randPhoneNumber,
} from "@ngneat/falso";

import {
  withBigSpenderDiscountRule,
  withSweetDigsDiscount,
  withFooBarSku,
} from "./rules";
import { Customer, Purchase } from "./types";

describe("withBigSpenderDiscountRule()", () => {
  const customer: Customer = {
    name: randFullName(),
    email: randEmail(),
    phoneNumber: randPhoneNumber(),
    deliveryAddress: randAddress().street,
  };

  const purchase: Purchase = {
    price: 10001,
    description: "purchase over 10000",
    productSKU: "SKU",
    customer: customer,
  };

  it("5% discount for price above 10,000", () => {
    const purchaseAfterDiscount = withBigSpenderDiscountRule(purchase);
    expect(purchaseAfterDiscount.price).toBe(9500.95);
  });

  it("no 5% discount if below 10,000", () => {
    const purchaseAfterDiscount = withBigSpenderDiscountRule({
      ...purchase,
      price: 10000,
    });
    expect(purchaseAfterDiscount.price).toBe(10000);
  });
});

describe("withSweetDigsDiscount()", () => {
  const customer: Customer = {
    name: randFullName(),
    email: randEmail(),
    phoneNumber: randPhoneNumber(),
    deliveryAddress: "10 example crt, Barangaroo Sydney",
  };

  const purchase: Purchase = {
    price: 10000,
    description: "purchase over 10000",
    productSKU: "SKU",
    customer: customer,
  };

  it("1% discount if delivery address has Barangaroo Sydney", () => {
    const purchaseAfterDiscount = withSweetDigsDiscount(purchase);
    expect(purchaseAfterDiscount.price).toBe(9900);
  });

  it("no discount if not from Barangaroo Sydney", () => {
    const purchaseAfterDiscount = withSweetDigsDiscount({
      ...purchase,
      customer: { ...purchase.customer, deliveryAddress: "unknown" },
    });
    expect(purchaseAfterDiscount.price).toBe(10000);
  });
});

describe("withFooBarSku()", () => {
  const customer: Customer = {
    name: randFullName(),
    email: randEmail(),
    phoneNumber: randPhoneNumber(),
    deliveryAddress: randAddress().street,
  };

  const purchase: Purchase = {
    price: 10000,
    description: "purchase over 10000",
    productSKU: "foo",
    customer: customer,
  };

  it("$100 discount if product SKU has foo", () => {
    const purchaseAfterDiscount = withFooBarSku(purchase);
    expect(purchaseAfterDiscount.price).toBe(9900);
  });

  it("$100 discount if product SKU has bar", () => {
    const purchaseAfterDiscount = withFooBarSku({
      ...purchase,
      productSKU: "bar",
    });
    expect(purchaseAfterDiscount.price).toBe(9900);
  });

  it("no discount if product SKU has bar", () => {
    const purchaseAfterDiscount = withFooBarSku({
      ...purchase,
      productSKU: "unknown",
    });
    expect(purchaseAfterDiscount.price).toBe(10000);
  });
});
