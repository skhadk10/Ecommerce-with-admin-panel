import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../component/common/form";
import { loginFormControls } from "@/component/common";

const initialState = {
  email: "rickeykhd@gmail.com",
  password: "",
};
const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);

  const onSubmit = () => {};
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">Dont have an account</p>
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
