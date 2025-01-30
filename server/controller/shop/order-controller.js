// const { response } = require("express");
// const { getAccessToken } = require("../../helper/paypal");

// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId,
//       payerId,
//     } = req.body;
//     const access_token = await getAccessToken();

//     const response = await got.post(
//       `${process.env.PAYPAL_BASEURL}/v1/checkout/orders`,
//       {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//   json: {
//     intent: "sale",
//     payer: {
//       payment_Method: "paypal",
//     },
//     redirect_urls: {
//       return_url: "http://localhost:5173/shop/paypal-return",
//       cancel_url: "http://localhost:5173/shop/paypal-cancel",
//     },
//     transactions: [
//       {
//         item_list: {
//           item: cartItems.map(
//             (item = {
//               name: item.title,
//               sku: item.productId,
//               price: item.price.toFixed(2),
//               currency: "USD",
//               quantity: item.quantity,
//             })
//           ),
//         },
//         amount: {
//           currency: "USD",
//           totol: totalAmount.toFixed(2),
//         },
//         discription: "discription",
//       },
//     ],
//   },
//   responseType: "json",
// }
//     );
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "error on paypal",
//     });
//   }
// };

// module.exports = { createOrder };

import got from "got";
import { getAccessToken } from "../../helper/paypal.js";
import Order from "../../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // Get PayPal access token
    const access_token = await getAccessToken();

    // Create PayPal order
    const response = await got.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        // json: {
        //   intent: "sale",
        //   purchase_units: [
        //     {
        //       amount: {
        //         currency_code: "USD",
        //         value: totalAmount.toFixed(2),
        //         breakdown: {
        //           item_total: {
        //             currency_code: "USD",
        //             value: totalAmount.toFixed(2),
        //           },
        //         },
        //       },
        //       items: cartItems.map((item) => ({
        //         name: item.title,
        //         sku: item.productId,
        //         unit_amount: {
        //           currency_code: "USD",
        //           value: parseFloat(item.salePrice).toFixed(2),
        //         },
        //         quantity: item.quantity,
        //       })),
        //     },
        //   ],
        //   application_context: {
        //     return_url: "http://localhost:5173/shop/paypal-return",
        //     cancel_url: "http://localhost:5173/shop/paypal-cancel",
        //   },
        // },

        json: {
          intent: "sale",
          payer: {
            payment_Method: "paypal",
          },
          redirect_urls: {
            return_url: "http://localhost:5173/shop/paypal-return",
            cancel_url: "http://localhost:5173/shop/paypal-cancel",
          },
          transactions: [
            {
              item_list: {
                item: cartItems.map(
                  (item = {
                    name: item.title,
                    sku: item.productId,
                    price: item.price.toFixed(2),
                    currency: "USD",
                    quantity: item.quantity,
                  })
                ),
              },
              amount: {
                currency: "USD",
                totol: totalAmount.toFixed(2),
              },
              discription: "discription",
            },
          ],
        },

        responseType: "json",
      }
    );

    const paypalOrder = response.body;

    // Save order in MongoDB
    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "Pending",
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId: paymentId, //paypalOrder.id, // Save PayPal Order ID
      payerId: payerId || null,
    });

    await newOrder.save();

    // Extract the approval URL
    const approveURL = paypalOrder.links.find(
      (link) => link.rel === "approve"
    )?.href;
    res.status(200).json({
      success: true,
      message: "PayPal order created and saved in MongoDB",
      approveURL,
      orderId: paypalOrder._id,
    });
  } catch (error) {
    console.error("Error in PayPal Integration:", error);
    res.status(500).json({
      success: false,
      message: "Error processing PayPal payment and saving order",
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error processing PayPal payment and saving order",
    });
  }
};
