"use client";

import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { encodeSearch } from "@/lib/utils";

const SearchDialog = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search?q=${encodeSearch(search)}`);
    setOpen(false);
    setSearch("");
  };

  const handleOpen = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant="ghost"
          className="rounded-full"
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-transparent max-w-[90vw] md:max-w-[80vw]">
        <form onSubmit={handleSearch} className="flex flex-col">
          <input
            type="text"
            className="bg-transparent outline-none border-b py-2 sm:py-4 text-base sm:text-lg md:text-xl lg:text-3xl text-white w-full"
            placeholder="Masukan kata kunci pencarian..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            required
          />
          <Button
            variant={"secondary"}
            className="mt-4 w-fit mx-auto text-base sm:text-xl py-4 sm:w-40 rounded-full flex-shrink-0"
          >
            Cari
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
