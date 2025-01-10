"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import AuthLayout from "@/components/auth/layout";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/helpers/formControls";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("GlobalContext must be used within a GlobalState provider");
  }

  const { isAuthUser, setIsAuthUser, userData, setUserData } = context;

  useEffect(() => {
    const { email, password } = user;
    setButtonDisabled(!(email && password));
  }, [user]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      if (res.data.success) {
        setIsAuthUser(true);
        setUserData(res?.data?.user);
        Cookies.set("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        toast.success("Login successful!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Email or Password is Incorrect!");
    } finally {
      setLoading(false);
    }
    setButtonDisabled(false);
  };

  React.useEffect(() => {
    if (isAuthUser && userData?.role === "manager") {
      router.push("/dashboard/manager-view");
    } else if (
      (isAuthUser && userData?.role === "staff") ||
      userData?.role === "delivery"
    ) {
      router.push("/dashboard/pantry-view");
    }
  }, [isAuthUser, userData?.role, router]);

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p>
            Don&apos;t have an account?
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              href="/signup"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          formData={user}
          setFormData={setUser}
          onSubmit={onLogin}
          buttonText={loading ? "Logging in..." : "Login"}
          isBtnDisabled={buttonDisabled}
        />
        <div>
          <h5 className="font-bold">Login Credentials:</h5>
          <p>
            Email: hospital_manager@xyz.com <br /> Email:
            hospital_pantry@xyz.com <br />
            Email: hospital_delivery@xyz.com <br />
            Password: Password@2025
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
