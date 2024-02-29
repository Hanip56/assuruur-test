"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";
import Comment from "./comment";
import { Article, Comment as CommentType, User } from "@prisma/client";
import axios from "axios";
import Reply from "./reply";

type Props = {
  article: Article;
};

type CommentTypeWithUser = CommentType & {
  user?: User;
  childrens?: CommentTypeWithUser[];
};

const Comments = ({ article }: Props) => {
  const [comments, setComments] = useState<CommentTypeWithUser[]>([]);
  const [parentId, setParentId] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/api/comments?articleId=${article.id}`);

      if ("data" in res && res.data) {
        setComments(res.data as CommentTypeWithUser[]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [article.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  console.log({ comments });

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
            <Comment
              key={i}
              comment={comment}
              parentId={parentId}
              setParentId={setParentId}
              refresh={() => fetchComments()}
              articleId={article.id}
            />
          ))}
        </div>
      )}
      {/* Leave a reply */}
      <Reply articleId={article.id} refresh={() => fetchComments()} />
    </div>
  );
};

export default Comments;
