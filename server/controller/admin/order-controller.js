import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";

export const getAllOrdersOffAllUser = async (req, res) => {
  try {
    const orders = await Order.find({});
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
export const getOrdersDetailsForAdmin = async (req, res) => {
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

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
    await Order.findByIdAndUpdate(id, { orderStatus });
    res.status(200).json({
      success: true,
      message: "Order status is upload successfuly!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating order",
    });
  }
};
