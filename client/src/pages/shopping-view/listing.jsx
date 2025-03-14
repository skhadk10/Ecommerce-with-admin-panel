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
import {
  fecthProductDetails,
  fetchAllFilteredProducts,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./products-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "./product-Details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
};

const ShoppingListing = () => {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduct
  );
  const { cartitems } = useSelector((state) => state.shopCart);

  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fecthProductDetails(getCurrentProductId));
  };

  const handleSort = (value) => {
    setSort(value);
  };

  // const handleFilter = (getSectionId, getCurrentOption) => {
  //   console.log(getSectionId, getCurrentOption);

  //   let copyFilters = { ...filters };
  //   console.log(copyFilters, "find value");
  //   const indexOfCurrentSection =
  //     Object.keys(copyFilters).indexOf(getSectionId);

  //   if (indexOfCurrentSection === -1) {
  //     copyFilters = {
  //       ...copyFilters,
  //       [getSectionId]: [getCurrentOption],
  //     };

  //   } else {
  //     const indexOfCurrentOption =
  //       copyFilters[getSectionId].indexOf(getCurrentOption);
  //       console.log(indexOfCurrentOption,"options");
  //     if (indexOfCurrentOption === -1) {
  //       copyFilters[getSectionId].push(getCurrentOption);
  //     } else {
  //       copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
  //     }
  //   }
  //   setFilters(copyFilters);
  //   sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  // };

  const handleFilter = (keyItem, id) => {
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[keyItem] || [];
      const updatedFilters = currentFilters.includes(id) //if id is selected already from category or brand
        ? currentFilters.filter((item) => item !== id) // Remove if already selected
        : [...currentFilters, id]; // Add if not selected

      const newFilters = {
        ...prevFilters,
        [keyItem]: updatedFilters,
      };
      sessionStorage.setItem("filters", JSON.stringify(newFilters));

      return newFilters;
    });
  };

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    console.log(cartitems);
    console.log(getCurrentProductId, getTotalStock,"getcurrentproductid");
    let getCartItems = cartitems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));

        toast({
          title: "Product is added to cart",
        });
      }
    });
  };
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuearyString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQuearyString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filtersParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:p-6">
      <ProductFilter handleFilter={handleFilter} filters={filters} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] bg-slate-200"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {productList?.map((productItem) => (
            <ShoppingProductTile
              product={productItem}
              key={productItem._id}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <ProductDetails
        productDetails={productDetails}
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
      />
    </div>
  );
};

export default ShoppingListing;
