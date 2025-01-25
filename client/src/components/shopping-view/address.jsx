import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "../config";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./address-card";
import { addNewAddress, fetchAllAddress } from "@/store/shop/address-slice";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);

  const { addressList } = useSelector((state) => state.shopAddress);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleManageAddress = (event) => {
    event.preventDefault();
    dispatch(addNewAddress({ ...formData, userId: user?.id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        setFormData(initialAddressFormData);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);
  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  console.log(addressList, formData, "check");

  return (
    <Card>
      <div className="mb-5 p-3 grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                addressInfo={singleAddressItem}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
