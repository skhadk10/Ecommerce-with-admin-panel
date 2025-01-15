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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./products-tile";
import { useSearchParams } from "react-router-dom";

const ShoppingListing = () => {
  const { productList } = useSelector((state) => state.shopProduct);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (value) => {
    setSort( value );
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
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuearyString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQuearyString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);
  
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filtersParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);
  console.log(filters, searchParams.toString(), "find value");
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
            <ShoppingProductTile product={productItem} key={productItem._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
