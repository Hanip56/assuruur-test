"use client";

import ImagePicker from "@/components/image-picker";
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
import { BASE_IMAGE_URL } from "@/constants";
import { useUploadThing } from "@/lib/upload-thing";
import { compressImage, getErrorMessage } from "@/lib/utils";
import { UpdateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import ChangePasswordModal from "./change-password-modal";

type Props = {
  initialData: User;
};

const UpdateForm = ({ initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: initialData.name ?? "",
      email: initialData.email ?? "",
      image: initialData.image ?? "",
    },
  });

  const imageState = form.watch("image");

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    try {
      setIsLoading(true);
      let image = values.image;

      if (!!(values.image instanceof File)) {
        // upload image
        const compressedImg = await compressImage(values.image);
        const imgRes = await startUpload([compressedImg]);

        image = imgRes?.[0].key;
      }

      // update user
      await axios.patch(`/api/users/${initialData.id}`, {
        name: values.username,
        email: values.email,
        image,
      });

      toast.success("User updated");
      router.push("../users");
      router.refresh();
      form.reset();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChangePasswordModal
        isOpen={showChangePassModal}
        setIsOpen={setShowChangePassModal}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Image</FormLabel>
                  {/* image preview */}
                  {imageState && (
                    <div className="relative w-fit">
                      <Image
                        src={
                          !(imageState instanceof File)
                            ? `${BASE_IMAGE_URL}/${imageState}`
                            : URL.createObjectURL(imageState)
                        }
                        alt="Preview-image"
                        width={200}
                        height={200}
                        className="w-40 h-40 object-contain rounded-lg"
                      />
                      <Button
                        type="button"
                        onClick={() => field.onChange(undefined)}
                        className="absolute top-1 right-1 w-8 h-8"
                        size="icon"
                        variant="destructive"
                      >
                        <Trash className="w-4 h-4" />{" "}
                      </Button>
                    </div>
                  )}
                  <FormControl>
                    <div className="py-4">
                      <ImagePicker
                        isEmpty={true}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* change password */}
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setShowChangePassModal(true)}
            >
              Change Password
            </Button>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter username"
                      disabled={isLoading}
                    />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter email"
                      disabled={isLoading}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button className="ml-auto" disabled={isLoading}>
                Update
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateForm;
