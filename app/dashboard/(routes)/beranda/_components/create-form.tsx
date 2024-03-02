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
import { BerandaSchema } from "@/schemas";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BASE_IMAGE_URL } from "@/constants";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { compressImage, getErrorMessage } from "@/lib/utils";
import { useUploadThing } from "@/lib/upload-thing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner, BannerImage } from "@prisma/client";

type Props = {
  initialData: Banner & { images: BannerImage[] };
};

const CreateForm = ({ initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof BerandaSchema>>({
    resolver: zodResolver(BerandaSchema),
    defaultValues: {
      title: initialData.title ?? "",
      description: initialData.description ?? "",
      images: initialData.images,
    },
  });

  const refreshAndNavigate = () => {
    toast.success("Beranda updated");
    router.push("../dashboard");
    router.refresh();
  };

  const imagesState = form.watch("images") ?? [];

  // add or update product
  const onSubmit = async (values: z.infer<typeof BerandaSchema>) => {
    setIsLoading(true);
    const needDeleteImages = initialData?.images
      .filter(
        (image) =>
          !(image instanceof File) &&
          values?.images.every((img) => img.id !== image.id)
      )
      .map((image) => image.key);

    const needUploadImages = values.images.filter(
      (image) => image instanceof File
    );

    const hasNewImage = needUploadImages.length > 0;

    try {
      if (!hasNewImage) {
        await axios.patch(`/api/banners/${initialData.id}`, {
          ...values,
          images: values.images.map((image) => image.key),
          deleteImages: needDeleteImages?.length ? needDeleteImages : undefined,
        });
        return refreshAndNavigate();
      }

      const newUploadedImages = await Promise.all(
        needUploadImages.map(async (image, i) => {
          try {
            const compressedImg = await compressImage(image);
            const res = await startUpload([compressedImg]);

            return res?.[0].key;
          } catch (error) {
            console.log(`Failed to upload image: ${i}`);
            return null;
          }
        })
      );

      console.log("Images uploaded");

      // @type string[]
      const oldImages = [
        ...values.images
          .filter((image) => !(image instanceof File))
          .map((image) => image.key),
      ];
      // @type string[]
      const newImages = newUploadedImages.filter((imgKey) => imgKey);
      // @type string[]
      const deleteImages = needDeleteImages?.length
        ? needDeleteImages
        : undefined;

      // update with new image
      await axios.put(`/api/banners/${initialData.id}`, {
        title: values.title,
        description: values.description,
        images: [...oldImages, ...newImages],
        newImages,
        deleteImages,
      });
      return refreshAndNavigate();
    } catch (error) {
      toast.error(getErrorMessage(error));
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter title"
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter description"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Slideshow</FormLabel>
                {/* images preview */}
                {imagesState.length > 0 && (
                  <div className="flex flex-wrap border border-dashed gap-6 rounded-lg p-2">
                    {imagesState.map((image, i) => (
                      <div key={`preview-image-${i}`} className="relative">
                        <Image
                          src={
                            (image as Banner).id
                              ? `${BASE_IMAGE_URL}/${image.key}`
                              : URL.createObjectURL(image)
                          }
                          alt="Preview-image"
                          width={200}
                          height={200}
                          className="w-40 h-40 object-contain rounded-lg"
                        />
                        <Button
                          type="button"
                          onClick={() =>
                            field.onChange(
                              field.value.filter(
                                (_, targetId) => i !== targetId
                              )
                            )
                          }
                          className="absolute top-1 right-1 w-8 h-8"
                          size="icon"
                          variant="destructive"
                          disabled={isLoading}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <FormControl>
                  <div className="py-4">
                    <ImagePicker
                      isEmpty={!imagesState}
                      onChange={(files) =>
                        field.onChange([...field.value, ...(files as File[])])
                      }
                      disabled={isLoading}
                      multiple={true}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-end">
          <Button className="ml-auto" disabled={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;
