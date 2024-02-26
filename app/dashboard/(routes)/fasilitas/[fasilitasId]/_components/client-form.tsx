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
import MultiSelect from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_IMAGE_URL } from "@/constants";
import { useUploadThing } from "@/lib/upload-thing";
import { compressImage, getImageSize } from "@/lib/utils";
import { fasilitasSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fasilitas, FasilitasType } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type Props = {
  initialData?: Fasilitas | null;
  fasilitasTypes?: FasilitasType[] | null;
};

const ClientForm = ({ initialData, fasilitasTypes }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof fasilitasSchema>>({
    resolver: zodResolver(fasilitasSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          type: initialData?.fasilitasTypeId,
        }
      : {
          type: "",
          description: "",
          image: "",
          name: "",
        },
  });

  const imageState = form.watch("image");

  const onSubmit = async (values: z.infer<typeof fasilitasSchema>) => {
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
        await axios.patch(`/api/fasilitas/${initialData.id}`, {
          ...values,
          image,
          width,
          height,
        });
      } else {
        // create new
        await axios.post("/api/fasilitas", {
          ...values,
          image,
          width,
          height,
        });
      }

      toast.success(initialData ? "Fasilitas updated" : "Fasilitas created");
      router.push("../fasilitas");
      router.refresh();
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
          {/* fasilitas Types */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fasilitasTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              {initialData ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
