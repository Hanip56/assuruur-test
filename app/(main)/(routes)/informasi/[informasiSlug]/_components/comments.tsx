"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Comment from "./comment";
import FormReply from "./form-reply";
import { Article } from "@prisma/client";
import Link from "next/link";

type Props = {
  article: Article;
};

const Comments = ({ article }: Props) => {
  return (
    <div className="max-w-5xl mx-auto py-20 px-2 sm:px-4">
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">Komentar</h2>

        <Button
          className="hidden sm:block"
          variant={"assururOutline"}
          size={"lg"}
          onClick={() => {
            const section = document.getElementById("comment-form");
            window.scrollTo({
              top:
                (section?.getBoundingClientRect().top ?? 0) +
                window.scrollY -
                200,
            });
          }}
        >
          Beri komentar
        </Button>
      </div>
      {/* comment */}
      <div>
        {Array(3)
          .fill("")
          .map((_, i) => (
            <Comment key={i} />
          ))}
      </div>
      {/* Leave a reply */}
      <div className="py-28">
        <div className="flex justify-between items-center mb-16">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            Beri Tanggapan
          </h2>
        </div>
        <FormReply articleId={article.id} />
      </div>
    </div>
  );
};

export default Comments;
