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
import { getErrorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old Password is required"),
  newPassword: z.string().min(6, "Must at least 6 characters"),
});

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePasswordModal = ({ isOpen, setIsOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleClose = () => {
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/users/${params?.userId}`, values);
      toast.success("Password updated");
      setIsOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Password user"
      description="Use a strong password"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 max-h-60 overflow-y-auto px-2 py-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            onClick={(e) => e.stopPropagation()}
            className="mt-4 w-full"
            disabled={isLoading}
          >
            Save
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
