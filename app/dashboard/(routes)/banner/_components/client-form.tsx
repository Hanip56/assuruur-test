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
import { BASE_IMAGE_URL } from "@/constants";
import { useUploadThing } from "@/lib/upload-thing";
import { compressImage, getErrorMessage } from "@/lib/utils";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner, BannerImage, Foto } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type Props = {
  initialData?: (Banner & { images: BannerImage[] }) | null;
};

const BannerSchma = z.object({
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

const ClientForm = ({ initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof BannerSchma>>({
    resolver: zodResolver(BannerSchma),
    defaultValues: {
      image: initialData?.images[0].key ?? "",
    },
  });

  const imageState = form.watch("image");

  const onSubmit = async (values: z.infer<typeof BannerSchma>) => {
    try {
      setIsLoading(true);
      let image;

      if (!!(values.image instanceof File)) {
        // upload image
        const compressedImg = await compressImage(values.image);
        const imgRes = await startUpload([compressedImg]);

        image = imgRes?.[0].key;
      }

      // { title, description, images, deleteImages, newImages }

      if (initialData) {
        // update
        await axios.put(`/api/banners/${initialData.id}`, {
          title: "Default Banner",
          description: "banner default",
          deleteImages: image ? [initialData.images[0].key] : undefined,
          newImages: image ? [image] : undefined,
          images: image ? [image] : [initialData.images[0].key],
        });
      }

      toast.success("banner Updated");
      router.push("../dashboard");
      router.refresh();
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

export default ClientForm;
