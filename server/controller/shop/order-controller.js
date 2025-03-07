import got from "got";
import { getAccessToken } from "../../helper/paypal.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
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

    const response = await got.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        json: {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: totalAmount.toFixed(2),
                  },
                },
              },
              items: cartItems.map((item) => ({
                name: item.title,
                sku: item.productId,
                unit_amount: {
                  currency_code: "USD",
                  value: parseFloat(item.salePrice).toFixed(2),
                  // value: item.salePrice.toFixed(2),
                },
                // quantity: item.quantity,
                quantity: item.quantity.toString(),
              })),
            },
          ],
          application_context: {
            return_url: "http://localhost:5173/shop/paypal-return",
            cancel_url: "http://localhost:5173/shop/paypal-cancel",
          },
        },
        responseType: "json",
      }
    );

    const paypalOrder = response.body;
    // Save order in MongoDB
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "Pending",
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId: paypalOrder.id, // Save PayPal Order ID
      payerId: payerId || null,
    });

    await newOrder.save();

    // Extract the approval URL
    const approvalURL = paypalOrder.links.find(
      (link) => link.rel === "approve"
    )?.href;
    res.status(200).json({
      success: true,
      message: "PayPal order created and saved in MongoDB",
      approvalURL,
      orderId: newOrder._id,
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
    const { paymentId, payerId, orderId } = req.body;
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `ot enough stock for this product ${product.title}`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "order confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error processing PayPal payment and saving order",
    });
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({
      userId,
    });
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All orders fetched",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};
export const getOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};
