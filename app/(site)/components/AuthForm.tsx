"use client";

import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import AuthSocialButton from "./AuthSocialButton";
import { BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
        })
        .catch((err) => {
          toast.error(`Ooops... ${err.response.data}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((data) => {
          if (data?.error) {
            toast.error("Invalid credentials");
          }

          if (data?.ok && !data?.error) {
            toast.success("Success");
            router.push("/users");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = () => {
    setIsLoading(true);
    signIn("google", { redirect: false }, { prompt: "select_account" })
      .then((data) => {
        if (data?.error) {
          toast.error("Invalid credentials");
        }

        if (data?.ok && !data?.error) {
          toast.success("Success");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-base-300 px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {variant === "REGISTER" && (
            <Input
              id={"name"}
              label="Name"
              register={register}
              errors={errors}
            />
          )}

          <Input
            id={"email"}
            label="Email"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id={"password"}
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-content" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-base-300 px-2 text-base-content">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction()} />
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-base-content">
            <div>
              {variant === "LOGIN"
                ? "New to whisper?"
                : "Already have an account?"}
            </div>
            <div className="underline cursor-pointer" onClick={toggleVariant}>
              {variant === "LOGIN" ? "Create an account" : "Log in"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
