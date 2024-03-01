"use client";

import Tiptap from "@/app/dashboard/_components/tiptap";
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
import { compressImage, getErrorMessage, getImageSize } from "@/lib/utils";
import { fotoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Foto } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type Props = {
  initialData?: Foto | null;
};

const ClientForm = ({ initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof fotoSchema>>({
    resolver: zodResolver(fotoSchema),
    defaultValues: initialData ?? {
      alt: "",
      description: "",
    },
  });

  const imageState = form.watch("image");

  const onSubmit = async (values: z.infer<typeof fotoSchema>) => {
    try {
      setIsLoading(true);
      let image;
      let width;
      let height;

      if (!!(values.image instanceof File)) {
        // upload image
        const compressedImg = await compressImage(values.image);
        const imgRes = await startUpload([compressedImg]);

        image = imgRes?.[0].key;

        if (imgRes?.[0]?.url) {
          const size = await getImageSize(imgRes?.[0]?.url);

          width = size.width;
          height = size.height;
        }
      }

      if (initialData) {
        // update
        await axios.patch(`/api/fotos/${initialData.id}`, {
          ...values,
          image,
          width,
          height,
        });
      } else {
        // create new
        await axios.post("/api/fotos", {
          ...values,
          image,
          width,
          height,
        });
      }

      toast.success(initialData ? "Foto updated" : "Foto created");
      router.push("../fotos");
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
            {/* description */}
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
            <div className="flex">
              <Button className="ml-auto" disabled={isLoading}>
                {initialData ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ClientForm;
