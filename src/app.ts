type Customer = {
  name: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
};

type Purchase = {
  price: number;
  description: string;
  productSKU: string;
  customer: Customer;
};

type PurchaseRule = (purchase: Purchase) => Purchase;

const purchaseEngine =
  (purchaseRules: PurchaseRule[]) => (initialPurchase: Purchase) => {};

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

const createPurchaseEngine = (purchaseRules: PurchaseRule[]) => {
  return (initialPurchase: Purchase) => {
    return purchaseRules.reduce((initial, purchaseRule) => {
      return purchaseRule(initial);
    }, initialPurchase);
  };
};

const purchaseEngine1 = createPurchaseEngine([
  withBigSpenderDiscountRule,
  withSweetDigsDiscount,
  withFooBarSku,
]);

const carPurchase: Purchase = {
  price: 10001,
  description: "car",
  productSKU: "",
  customer: {
    name: "heheh",
    email: "hehe@example.com",
    phoneNumber: "10101010",
    deliveryAddress: "Barangaroo Sydney",
  },
};

const costOfCar = purchaseEngine1(carPurchase);
console.log("costOfCar", costOfCar);
