"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Comment from "./comment";
import FormReply from "./form-reply";
import { Article, Comment as CommentType } from "@prisma/client";
import axios from "axios";

type Props = {
  article: Article;
};

const Comments = ({ article }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments?articleId=${article.id}`);

        if ("data" in res && res.data) {
          setComments(res.data as CommentType[]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [article.id]);

  return (
    <div className="max-w-5xl mx-auto py-16 px-2 sm:px-4">
      {comments?.length > 0 && (
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            Komentar
          </h2>

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
      )}
      {/* comment */}
      {comments?.length > 0 && (
        <div className="mb-20">
          {comments?.map((comment, i) => (
            <Comment key={i} comment={comment} />
          ))}
        </div>
      )}
      {/* Leave a reply */}
      <div className="pb-28">
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
