import got from "got";
import { Buffer } from "buffer";

export const getAccessToken = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  // Encode clientId and secret in Base64
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  try {
    const response = await got.post(
      `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
      // "grant_type:client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
        form: {
          grant_type: "client_credentials",
        },
        responseType: "json",
      }
    );
console.log(response.body.access_token,"check data");
    return response.body.access_token;
  } catch (error) {
    console.error(
      "Error fetching PayPal access token:",
      error.response ? error.response.body : error.message
    );
    throw new Error("Failed to retrieve PayPal access token");
  }
};
