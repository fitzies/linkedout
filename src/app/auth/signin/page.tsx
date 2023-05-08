"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { signInUser } from "@/util/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleEmailChange = (e: any) => {
    const temp = { ...formData, email: e.target.value };
    setFormData(() => temp);
  };

  const handlePasswordChange = (e: any) => {
    const temp = { ...formData, password: e.target.value };
    setFormData(() => temp);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center py-8">
      <div className="w-1/3 border border-gray-600 shadow-md p-6 py-8 flex flex-col items-center bg-gray-800 rounded-xl">
        <div className="font-bold text-2xl">Sign in to your account</div>
        <div className="my-2">
          Or{" "}
          <Link
            href="/auth/signup"
            className="text-gradient font-semibold cursor-pointer"
          >
            create your account
          </Link>
        </div>
        <Input
          placeholder="johndoe@gmail.com"
          onChange={handleEmailChange}
          text="Email address"
          type="email"
          value={formData.email}
        />
        <Input
          placeholder="••••••"
          onChange={handlePasswordChange}
          text="Password"
          type="password"
          value={formData.password}
        />
        <Button
          text="Sign in"
          onClick={() =>
            signInUser(formData.email, formData.password, () => {
              router.push("/");
            })
          }
        />
      </div>
    </div>
  );
};

export default Page;
