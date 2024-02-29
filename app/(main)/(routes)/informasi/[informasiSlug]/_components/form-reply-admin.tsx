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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import defaultUserImage from "@/public/images/default-user.jpg";

const replySchema = z.object({
  komentar: z.string().min(1, "Komentar Tidak boleh kosong."),
});

type Props = {
  articleId: string;
  refresh: () => void;
  parentId?: string;
};

const FormReplyAdmin = ({ articleId, refresh, parentId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const session = useSession();

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      komentar: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof replySchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const data = {
        body: values.komentar,
        articleId,
        userId: session.data?.user?.id,
        parentId,
      };

      await axios.post("/api/comments", data);
      setSuccess("Komentar berhasil dimasukan.");
      form.reset();
      refresh();
    } catch (error) {
      console.log(error);
      setError("Komentar gagal dimasukan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form id="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <div className="flex gap-4 mt-4">
          <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <Image
              src={
                session.data?.user?.image
                  ? `https://utfs.io/f/` + session.data?.user.image
                  : defaultUserImage
              }
              alt=""
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <FormField
            control={form.control}
            name="komentar"
            render={({ field }) => (
              <FormItem className="flex-1">
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
        </div>
        <div className="mt-8 flex">
          <Button
            variant={"assuruur"}
            className="ml-auto"
            size={"lg"}
            disabled={isLoading}
          >
            Kirim
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormReplyAdmin;
