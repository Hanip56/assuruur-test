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
import Modal from "@/components/ui/modal";
import { BASE_IMAGE_URL } from "@/constants";
import { useUploadThing } from "@/lib/upload-thing";
import { compressImage, getErrorMessage } from "@/lib/utils";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pimpinan } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const pimpinanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  image: z
    .any()
    .refine((file) => file, "Image is required")
    .refine(
      (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      "Max file size is 2mb"
    )
    .refine(
      (file) =>
        !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prePimpinan: Pimpinan | undefined;
  removePrePimpinan: () => void;
};

const PimpinanModal = ({
  isOpen,
  setIsOpen,
  prePimpinan,
  removePrePimpinan,
}: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();
  const params = useParams();

  const handleClose = () => {
    removePrePimpinan();
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof pimpinanSchema>>({
    resolver: zodResolver(pimpinanSchema),
    defaultValues: {
      name: "",
      image: "",
      title: "",
    },
  });

  useEffect(() => {
    if (!prePimpinan) return;

    form.setValue("name", prePimpinan?.name);
    form.setValue("title", prePimpinan?.title);
    form.setValue("image", prePimpinan?.image);
  }, [prePimpinan, form]);

  const imageState = form.watch("image");

  const onSubmit = async (values: z.infer<typeof pimpinanSchema>) => {
    setIsLoading(true);
    try {
      let image;

      if (!!(values.image instanceof File)) {
        // upload image
        const compressedImg = await compressImage(values.image);
        const imgRes = await startUpload([compressedImg]);

        image = imgRes?.[0].key;
      }

      if (prePimpinan) {
        // update
        await axios.patch(
          `/api/lembaga/${params?.lembagaId}/pimpinan/${prePimpinan.id}`,
          {
            ...values,
            image,
          }
        );
      } else {
        // create new
        await axios.post(`/api/lembaga/${params?.lembagaId}/pimpinan`, {
          ...values,
          image,
        });
      }

      toast.success(prePimpinan ? "Pimpinan updated" : "Pimpinan created");
      handleClose();
      router.refresh();
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <Modal
      title="Edit Pimpinan lembaga"
      description="Edit pimpinan lembaga"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        {/* image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Image</FormLabel>
              {/* image preview */}
              <div className="flex gap-4 items-center">
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
                      <Trash className="w-4 h-4" />
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
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button className="mt-4 w-full" disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default PimpinanModal;
