"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { FormError } from "@/components/ui/form-error-alert";
import { FormSuccess } from "@/components/ui/form-error-success";
import { login } from "@/actions/auth";
import Image from "next/image";
import logo from "@/public/logo footer.png";

const LoginPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    // setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        // setSuccess(data.success);
      });
    });
  };

  return (
    <div className="w-[100%] h-screen flex items-center justify-center bg-blueAssuruur">
      <Card className="w-96 shadow-2xl">
        <CardHeader>
          <CardTitle>
            <div className="mx-auto w-40">
              <Image
                src={logo}
                alt="Logo Assuruur"
                className="w-full"
                width={500}
                height={500}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-3">
                <FormError message={error} />
                <FormSuccess message={success} />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter username"
                        disabled={isPending}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter password"
                        type="password"
                        disabled={isPending}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button disabled={isPending} variant={"assuruur"}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
