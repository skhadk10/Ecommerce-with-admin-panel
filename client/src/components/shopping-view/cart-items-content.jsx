import React from "react";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";

const UserCartContent = ({ cartItems }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
      </div>
    </div>
  );
};

export default UserCartContent;
