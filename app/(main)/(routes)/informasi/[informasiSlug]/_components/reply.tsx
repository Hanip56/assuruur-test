"use client";

import FormReplyAdmin from "./form-reply-admin";
import FormReply from "./form-reply";
import { useSession } from "next-auth/react";
import { refresh } from "aos";

type Props = {
  articleId: string;
  refresh: () => void;
  parentId?: string;
  parentName?: string | null;
};

const Reply = ({ articleId, refresh, parentId, parentName }: Props) => {
  const session = useSession();
  const isAdmin = session && session.data?.user;

  return (
    <div className="pb-28">
      <div className="flex justify-between items-center mb-16">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          {parentName
            ? `Beri balasan kepada ${parentName} `
            : "Beri Tanggapan "}
          {isAdmin && (
            <span className="text-base text-blueAssuruur italic">
              Sebagai: {session.data?.user?.name}
            </span>
          )}
        </h2>
      </div>
      {session && session.data?.user ? (
        <FormReplyAdmin
          refresh={refresh}
          articleId={articleId}
          parentId={parentId}
        />
      ) : (
        <FormReply articleId={articleId} parentId={parentId} />
      )}
    </div>
  );
};

export default Reply;
