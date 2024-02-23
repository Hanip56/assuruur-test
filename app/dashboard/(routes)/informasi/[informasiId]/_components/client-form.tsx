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
import { compressImage } from "@/lib/utils";
import { articleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Article, Category, Tag, TagsOnArticles } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type ArticleWithTags = Article & { tags: TagsOnArticles[] };

type Props = {
  initialData?: ArticleWithTags | null;
  categories?: Category[] | null;
  tags?: Tag[] | null;
};

const ClientForm = ({ initialData, categories, tags }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          category: initialData?.categoryId,
          tags: initialData?.tags.map((tag) => tag.tagId),
        }
      : {
          category: "",
          content: "",
          image: "",
          tags: [],
          title: "",
        },
  });

  const imageState = form.watch("image");
  const tagsState = form.watch("tags");

  const tagsSelectValue = tagsState?.map((tagId) => {
    const index = tags?.findIndex((t) => t.id === tagId);
    if (index === undefined || index < 0 || !tags) return;

    return {
      value: tags[index].id,
      label: tags[index].name,
    };
  });

  const onSubmit = async (values: z.infer<typeof articleSchema>) => {
    try {
      setIsLoading(true);

      // upload image
      const compressedImg = await compressImage(values.image);
      const imgRes = await startUpload([compressedImg]);

      // save to database
      if (imgRes && imgRes.length > 0) {
        await axios.post("/api/articles", {
          ...values,
          image: imgRes[0].key,
        });
        toast.success("Informasi created");
        router.push("../informasi");
        router.refresh();
        form.reset();
      }
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
          <div className="flex flex-col md:flex-row gap-6 [&>*]:w-full">
            {/* category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiSelect
                      isMulti
                      value={tagsSelectValue}
                      onChange={(e: any) =>
                        field.onChange(e.map((r: any) => r.value))
                      }
                      options={tags?.map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                      }))}
                      isDisabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
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
