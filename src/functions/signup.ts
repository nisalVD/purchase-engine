import { Handler } from "@netlify/functions";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Customer } from "../discountEngine/types";

const handler: Handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const body = event.body && JSON.parse(event.body);

      const User = z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
        phoneNumber: z.string(),
        deliveryAddress: z.string(),
      });

      const parsed = User.safeParse(body);
      if (!parsed.success) {
        return {
          statusCode: 400,
          body: JSON.stringify(parsed.error),
          headers: {
            "Content-Type": "application/json",
          },
        };
      }

      const { name, email, phoneNumber, deliveryAddress } = parsed.data;

      const customer: Customer = {
        name,
        email,
        phoneNumber,
        deliveryAddress,
      };

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          ...customer,
        },
        process.env.JWT_SECRET as string
      );

      const response = {
        token,
      };

      return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: err.message }),
          headers: {
            "Content-Type": "application/json",
          },
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify(err),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  return {
    statusCode: 404,
  };
};

export { handler };
