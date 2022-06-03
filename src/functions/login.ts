import { Handler } from "@netlify/functions";
import { profile, profileEnd } from "console";
import jwt from "jsonwebtoken";
import { Customer } from "../discountEngine/types";

const handler: Handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const body = event.body && JSON.parse(event.body);
    if (body?.email === "hello@example.com" && body?.password === "password") {
      const customer: Customer = {
        email: "hello@example.com",
        name: "exampleDude",
        phoneNumber: "0214321321",
        deliveryAddress: "Barangaroo Sydney",
      };

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          ...customer,
        },
        process.env.JWT_SECRET as string
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ token }),
      };
    }
    return {
      statusCode: 403,
    };
  }
  return {
    statusCode: 404,
  };
};

export { handler };
