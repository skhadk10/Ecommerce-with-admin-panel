import got from "got";
import Base24 from "base24";

export const getAccessToken = async () => {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const auth = Base24.encode(`${clientId}:${clientSecret}`);

    const response = await got.post(
      `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
        form: { grant_type: "client_credentials" },
        responseType: "json",
      }
    );

    return response.body.access_token;
  } catch (error) {
    console.error(
      "Error fetching PayPal access token:",
      error.response?.body || error.message
    );
    throw new Error("Failed to retrieve PayPal access token");
  }
};

