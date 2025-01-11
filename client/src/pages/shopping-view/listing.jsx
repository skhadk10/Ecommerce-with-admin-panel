import { sortOptions } from "@/components/config";
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchAllFilteredProducts } from "@/store/shop";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./products-tile";

const ShoppingListing = () => {
  const { productList } = useSelector((state) => state.shopProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);
  console.log(productList, "find value");
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  classNamef="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grids-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList?.map((productItem) => (
            <ShoppingProductTile product={productItem} key={productItem.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
