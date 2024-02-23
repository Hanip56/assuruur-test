"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";

type ImagePickerProps = {
  isEmpty: boolean;
  onChange: (value: File | File[] | undefined) => void;
  disabled?: boolean;
  multiple?: boolean;
};

const ImagePicker = ({
  isEmpty,
  onChange,
  disabled,
  multiple = false,
}: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          if (multiple) {
            onChange(e.target.files?.length ? Array.from(e.target.files) : []);
          } else {
            onChange(e.target.files?.[0]);
          }
          e.target.value = "";
        }}
        className="sr-only"
        ref={inputRef}
        multiple={multiple}
      />
      <Button
        variant="outline"
        type="button"
        disabled={disabled}
        onClick={handleClick}
      >
        <ImageIcon className="w-4 h-4 mr-4" />
        {multiple && "Add Image"}
        {!multiple && (isEmpty ? "Add Image" : "Change Image")}
      </Button>
    </>
  );
};

export default ImagePicker;
