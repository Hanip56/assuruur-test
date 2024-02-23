"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type Props = {
  initialData?: Category | null;
};

const ClientForm = ({ initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    setIsLoading(true);

    try {
      if (initialData) {
        await axios.put(`/api/categories/${initialData.id}`, values);
      } else {
        await axios.post("/api/categories", values);
      }
      toast.success(initialData ? "Category updated" : "Category created");
      router.push("../categories");
      router.refresh();
    } catch (error) {
      console.log(error);
      // toast.error((error as any)?.response?.data ?? "Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter name"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Description (optional)"}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter description"
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex">
          <Button className="mt-6 ml-auto" disabled={isLoading}>
            {initialData ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
