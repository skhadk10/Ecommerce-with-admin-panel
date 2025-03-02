import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetails from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const { orderList } = useSelector((state) => state.shopOrder);
  const { user } = useSelector((state) => state.auth);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch]);

  console.log(orderList, "orderlist");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate}</TableCell>
                    <TableCell>
                      <Badge>{orderItem?.orderStatus}</Badge>
                    </TableCell>
                    <TableCell>{orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={setOpenDetailsDialog}
                      >
                        <Button
                          onClick={() => setOpenDetailsDialog(true)}
                          className="text-white bg-black hover:text-black"
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetails />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
