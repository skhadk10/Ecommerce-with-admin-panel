import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../component/common/form";
import { registerFormControls } from "@/component/common";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";

const initialState = {
  UserName: "sanish khadka",
  email: "rickeykhd@gmail.com",
  password: "",
};
const AuthRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then(() => {
      // if (data?.payload?.success) {
      //   toast({
      //     title: data?.payload?.message,
      //   });
      // }
      navigate("/auth/login");
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">Already have an account</p>
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
