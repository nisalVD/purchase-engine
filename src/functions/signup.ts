import { Handler } from "@netlify/functions";

const handler:  = async (event, contect) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ hello: "world" }),
  };
};

export { handler };
