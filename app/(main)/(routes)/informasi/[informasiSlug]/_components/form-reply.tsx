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
import { FormError } from "@/components/ui/form-error-alert";
import { FormSuccess } from "@/components/ui/form-error-success";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const replySchema = z.object({
  komentar: z.string().min(1, "Komentar Tidak boleh kosong."),
  nama: z.string().min(1, "Nama Tidak boleh kosong."),
  email: z.string().email("Email harus valid email."),
});

const FormReply = ({ articleId }: { articleId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      email: "",
      komentar: "",
      nama: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof replySchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const data = {
        username: values.nama,
        body: values.komentar,
        email: values.email,
        articleId,
      };

      await axios.post("/api/comments", data);
      setSuccess(
        "Terima Kasih, Komentar berhasil dikirim. Komentar akan menunggu persetujuan admin"
      );
      form.reset();
    } catch (error) {
      console.log(error);
      setError("Komentar gagal dikirim");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form id="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <div className="space-y-6 mt-4">
          <FormField
            control={form.control}
            name="komentar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Komentar</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Komentar*"
                    className="min-h-40"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Nama</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nama*" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email*" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 flex">
          <Button
            variant={"assuruur"}
            className="ml-auto"
            size={"lg"}
            disabled={isLoading}
          >
            Kirimkan
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormReply;
