export type PurchaseRule = (purchase: Purchase) => Purchase;

export type Customer = {
  name: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
};

export type Purchase = {
  price: number;
  description: string;
  productSKU: string;
  customer: Customer;
};
