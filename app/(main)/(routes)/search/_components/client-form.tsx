"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { encodeSearch } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";

type Props = {
  defaultValue: string;
};

const ClientForm = ({ defaultValue }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchRef.current) return;

    router.push(`/search?q=${encodeSearch(searchRef.current.value)}`);
  };

  return (
    <form
      className="flex flex-col sm:flex-row items-center gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Masukan kata kunci pencarian"
        className="focus-visible:ring-blueAssuruur rounded-full"
        required
        ref={searchRef}
        defaultValue={defaultValue}
      />
      <Button className="bg-blueAssuruur rounded-full w-full sm:w-[20%]">
        Cari
      </Button>
    </form>
  );
};

export default ClientForm;
