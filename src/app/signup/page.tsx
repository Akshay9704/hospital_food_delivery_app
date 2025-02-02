"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios"; // Import AxiosError for more specific error handling
import toast from "react-hot-toast";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/helpers/formControls";
import AuthLayout from "@/components/auth/layout";

const initialState = {
  username: "",
  email: "",
  password: "",
  role: "",
};

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState(initialState);
  console.log(user);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    const { username, email, password } = user;
    if (username && email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.username, user.email, user.password, user]);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data);
      router.push("/login");
      toast.success("Signup successfully!");
    } catch (error) {
      const axiosError = error as AxiosError;  // Use AxiosError for better error handling
      console.error(axiosError);
      toast.error("Signup failed!");
    }
    setButtonDisabled(false);
  };

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={user}
          setFormData={setUser}
          onSubmit={onSignup}
          isBtnDisabled={buttonDisabled}
        />
      </div>
    </AuthLayout>
  );
}
