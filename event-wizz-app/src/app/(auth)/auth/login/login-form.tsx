"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Error from "@/components/notifications/error";
import Icons from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function LoginForm() {
  const { toast: defaultToaster } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState,reset } = useForm({
    mode: "onChange",
  });
  const { errors } = formState;

  //resend link

  const resendVerifyLink = async () => {
    window.location.href = "/auth/verify-email";
  };

  const handleLoginForm = async (formData: any) => {
    const { email, password, remember } = formData;
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (Cookies.get("status") == "409") {
        handleEmailNotVerified(response);
      }
      if (response?.status == 200 && response?.ok) {
        toast.success("Logged in successfully");
        reset()
        setTimeout(() => {
          window.location.href = "/owner/on-boarding";
        }, 1500);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEmailNotVerified = (response: any) => {
    if (
      Cookies.get("message") &&
      response?.status != 200 &&
      Cookies.get("status") == "409"
    ) {
      const verify = Cookies.get("verify");
      if (verify) {
        defaultToaster({
          title: "Email",
          description: Cookies.get("message"),
          variant: "destructive",
          action: (
            <ToastAction altText="Try again" onClick={resendVerifyLink}>
              Resend Link
            </ToastAction>
          ),
        });
      }
      Cookies.remove("message");
      Cookies.remove("verify");
      Cookies.remove("status");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginForm)} className="group">
      <section className="grid gap-4">
        <article className="grid gap-2 my-2">
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            className={errors?.email ? "border-red-500" : ""}
            placeholder="mail@example.com"
            {...register("email", { required: true })}
          />
          {errors.email && <Error message={"Email is required"} />}
        </article>
        <article className="grid gap-2 my-2">
          <div className="flex items-center">
            <Label htmlFor="password">Your Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="******"
            className={errors?.password ? "border-red-500" : ""}
            {...register("password", { required: true })}
          />
          {errors.password && <Error message={"Password is required"} />}
        </article>

        <article className="grid gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember_me"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("remember")}
            />
            <label
              htmlFor="remember_me"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember Me
            </label>
          </div>
        </article>
        <article className={"flex justify-between gap-2"}>
          <Button
            type="submit"
            disabled={loading}
            className={`w-full group-invalid:pointer-events-none group-invalid:opacity-30`}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </article>

        <article className={"flex justify-between gap-2"}>
          <Button
            type={"button"}
            onClick={() => handleGoogleLogin()}
            variant="outline"
            className="w-full"
          >
            <Icons.google className={"h-3 w-3 mr-2"} /> Login with Google
          </Button>
          <Button
            type={"button"}
            onClick={() => handleFacebookLogin()}
            variant="outline"
            className="w-full"
          >
            <Icons.facebook className={"h-4 w-4 mr-2"} /> Login with Facebook
          </Button>
        </article>
      </section>
      <article className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline">
          Sign up
        </Link>
      </article>
    </form>
  );
}
