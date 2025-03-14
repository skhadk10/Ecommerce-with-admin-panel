import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment successful...</CardTitle>
      </CardHeader>
      <Button classNam="mt-5" onClick={() => navigate("/shop/account")}>
        Go to Account
      </Button>
    </Card>
  );
};

export default PaymentSuccessPage;
