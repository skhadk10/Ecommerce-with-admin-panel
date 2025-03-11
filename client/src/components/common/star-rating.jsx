import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";
import { ZodNull } from "zod";

const StarRatingComponent = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5].map((star, index) => (
    <Button
      variant="outline"
      size="icon"
      key={index}
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
      className={`p-2 rounded-full transition-colors${(star) =>
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"}`}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
};

export default StarRatingComponent;
