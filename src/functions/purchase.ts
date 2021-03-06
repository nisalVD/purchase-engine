import { Handler } from "@netlify/functions";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

import { Customer, Purchase } from "../discountEngine/types";
import discountEngine from "../discountEngine/engine";

type CustomerJWT = Customer & JwtPayload;

const handler: Handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const PurchaseSpec = z.object({
      price: z.number(),
      description: z.string(),
      productSKU: z.string(),
    });

    let parsedAuthToken: CustomerJWT;

    try {
      const authHeader = event.headers["authorization"];

      let authToken = authHeader?.split(" ")[1];
      if (!authHeader || !authToken) {
        return {
          statusCode: 403,
        };
      }
      parsedAuthToken = jwt.verify(
        authToken,
        process.env.JWT_SECRET as string
      ) as CustomerJWT;
    } catch (err) {
      return {
        statusCode: 403,
      };
    }

    const body = event.body && JSON.parse(event.body);

    const purchase = PurchaseSpec.safeParse(body);
    if (!purchase.success) {
      return {
        statusCode: 400,
        body: JSON.stringify(purchase.error),
      };
    }

    const customer: Customer = {
      name: parsedAuthToken.name,
      email: parsedAuthToken.email,
      phoneNumber: parsedAuthToken.phoneNumber,
      deliveryAddress: parsedAuthToken.deliveryAddress,
    };

    const purchaseToParse: Purchase = {
      ...purchase.data,
      customer,
    };
    const discountedPurchase = discountEngine(purchaseToParse);
    return {
      statusCode: 200,
      body: JSON.stringify(discountedPurchase),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 404,
  };
};

export { handler };
