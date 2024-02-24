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
import { compressImage } from "@/lib/utils";
import { lembagaSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lembaga, Misi, Pimpinan } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import MisiModal from "./misi-modal";
import PimpinanModal from "./pimpinan-modal";

type Props = {
  initialData?: Lembaga | null;
  misis: Misi[];
  pimpinans: Pimpinan[];
};

const ClientForm = ({ initialData, misis, pimpinans }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMisiModal, setShowMisiModal] = useState(false);
  const [showPimpinanModal, setShowPimpinanModal] = useState(false);
  const [currentPimpinan, setCurrentPimpinan] = useState<Pimpinan>();

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof lembagaSchema>>({
    resolver: zodResolver(lembagaSchema),
    defaultValues: {
      ...initialData,
      moreInfo: initialData?.moreInfo ?? "",
    } ?? {
      name: "",
      visi: "",
      image: "",
      profile: "",
      moreInfo: "",
    },
  });

  const imageState = form.watch("image");

  const onSubmit = async (values: z.infer<typeof lembagaSchema>) => {
    try {
      setIsLoading(true);
      let image;

      if (!!(values.image instanceof File)) {
        // upload image
        const compressedImg = await compressImage(values.image);
        const imgRes = await startUpload([compressedImg]);

        image = imgRes?.[0].key;
      }

      if (initialData) {
        // update
        await axios.patch(`/api/lembaga/${initialData.id}`, {
          ...values,
          image,
        });
      } else {
        // create new
        await axios.post("/api/lembaga", {
          ...values,
          image,
        });
      }

      toast.success(initialData ? "Informasi updated" : "Informasi created");
      router.push("../lembaga");
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
    <>
      <MisiModal
        isOpen={showMisiModal}
        setIsOpen={setShowMisiModal}
        misis={misis}
      />
      <PimpinanModal
        isOpen={showPimpinanModal}
        setIsOpen={setShowPimpinanModal}
        prePimpinan={currentPimpinan}
        removePrePimpinan={() => setCurrentPimpinan(undefined)}
      />

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

            {/* visi */}
            <FormField
              control={form.control}
              name="visi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visi</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter visi"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* pimpinan */}
            <div className="w-full rounded-xl border">
              {/* header */}
              <div className="px-6 py-4 flex justify-between items-center border-b">
                <h3 className="text-base md:text-lg font-medium">Pimpinan</h3>
              </div>
              <div className="px-6 py-4 flex flex-col gap-2">
                {pimpinans?.map((pimpinan) => (
                  <div
                    key={pimpinan.id}
                    className="flex justify-between items-center text-sm gap-2"
                  >
                    {/* image */}
                    <div className="w-20 h-20">
                      <Image
                        src={`${BASE_IMAGE_URL}/${pimpinan.image}`}
                        alt=""
                        width={200}
                        height={200}
                        className="w-full h-full  object-cover"
                      />
                    </div>
                    <p className="hidden sm:inline">{pimpinan.name}</p>
                    {/* action */}
                    <div>
                      <Button
                        size={"sm"}
                        type="button"
                        onClick={() => {
                          setCurrentPimpinan(pimpinan);
                          setShowPimpinanModal(true);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* misi */}
            <div className="w-full rounded-xl border">
              {/* header */}
              <div className="px-6 py-4 flex justify-between items-center border-b">
                <h3 className="text-base md:text-lg font-medium">Misi</h3>
                {initialData?.id && (
                  <Button type="button" onClick={() => setShowMisiModal(true)}>
                    Edit
                  </Button>
                )}
              </div>
              <div className="px-6 py-4">...</div>
            </div>
            {/* profile */}
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profil lembaga</FormLabel>
                  <FormControl>
                    <Tiptap
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* profile */}
            <FormField
              control={form.control}
              name="moreInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>More Info (optional)</FormLabel>
                  <FormControl>
                    <Tiptap
                      description={field.value ?? ""}
                      onChange={field.onChange}
                    />
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
    </>
  );
};

export default ClientForm;
