"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tagSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FasilitasType } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type Props = {
  initialData?: FasilitasType | null;
};

const ClientForm = ({ initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tagSchema>) => {
    setIsLoading(true);

    try {
      if (initialData) {
        await axios.put(`/api/fasilitas-type/${initialData.id}`, values);
      } else {
        await axios.post("/api/fasilitas-type", values);
      }
      toast.success(
        initialData ? "Fasilitas Type updated" : "Fasilitas Type created"
      );
      router.push("../fasilitas-type");
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
            </FormItem>
          )}
        />
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
