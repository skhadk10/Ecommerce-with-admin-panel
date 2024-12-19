import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../component/common/form";
import { loginFormControls } from "@/component/common";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  email: "rickeykhd@gmail.com",
  password: "",
};
const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toast } = useToast();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      // console.log(data, "soluton");
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        // if (data?.payload?.user?.role === "admin") {
        //   navigate("/admin/dashboard");
        // }
        // navigate("/shop/home");
      } else {
        toast({
          variant: "destructive",
          title: data?.payload?.message,
        });
      }
    });
  };

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
