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
import Modal from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Misi } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const misiSchema = z.object({
  misi1: z.string().min(1, "Misi 1 is required"),
  misi2: z.string().min(1, "Misi 2 is required"),
  misi3: z.string().min(1, "Misi 3 is required"),
  misi4: z.string().optional(),
  misi5: z.string().optional(),
  misi6: z.string().optional(),
});

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  misis: Misi[];
};

const MisiModal = ({ isOpen, setIsOpen, misis }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleClose = () => {
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof misiSchema>>({
    resolver: zodResolver(misiSchema),
    defaultValues: {
      misi1: misis[0]?.content ?? "",
      misi2: misis[1]?.content ?? "",
      misi3: misis[2]?.content ?? "",
      misi4: misis[3]?.content ?? "",
      misi5: misis[4]?.content ?? "",
      misi6: misis[5]?.content ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof misiSchema>) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/lembaga/${params?.lembagaId}/misi`, values);
      toast.success("Misi updated");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Misi lembaga"
      description="Edit misi-misi lembaga"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 max-h-60 overflow-y-auto px-2 py-4">
            <FormField
              control={form.control}
              name="misi1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi 01</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="misi2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi 02</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="misi3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi 03</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="misi4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi 04 {"(optional)"}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="misi5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi 05 {"(optional)"}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="misi6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi 06 {"(optional)"}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="mt-4 w-full" disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default MisiModal;
