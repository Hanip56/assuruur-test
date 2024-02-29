import { Comment as CommentType, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import defaultUserImage from "@/public/images/default-user.jpg";
import Reply from "./reply";

type CommentTypeWithUser = CommentType & { user?: User };

type Props = {
  comment: CommentType & { user?: User; childrens?: CommentTypeWithUser[] };
  parentId: string;
  setParentId: React.Dispatch<React.SetStateAction<string>>;
  refresh: () => void;
  articleId: string;
};

const Comment = ({
  comment,
  setParentId,
  articleId,
  parentId,
  refresh,
}: Props) => {
  return (
    <>
      <CommentCard comment={comment} setParentId={setParentId} />
      {/* reply */}
      {parentId === comment.id && (
        <div className="pt-8 -mb-8">
          <button
            onClick={() => setParentId("")}
            type="button"
            className="font-semibold text-blueAssuruur py-2 hover:opacity-70 underline"
          >
            Batal Membalas
          </button>
          <Reply
            articleId={articleId}
            refresh={refresh}
            parentId={comment.id}
            parentName={comment.username ?? comment?.user?.name}
          />
        </div>
      )}

      {/* childrens */}
      {comment?.childrens && (
        <div className="pl-[10%]">
          {comment.childrens?.map((c) => (
            <CommentCardWithoutReply key={c.id} comment={c} />
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;

const CommentCard = ({
  comment,
  setParentId,
}: Omit<Props, "parentId" | "refresh" | "articleId">) => {
  return (
    <div className="space-y-6 border-b py-8">
      <div className="flex items-center justify-between">
        {/* user */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src={
                comment?.user?.image
                  ? `https://utfs.io/f/` + comment?.user?.image
                  : defaultUserImage
              }
              alt="default user image"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>{comment.username ?? comment?.user?.name}</b>
            <small>{format(new Date(comment.createdAt), "dd MMMM yyyy")}</small>
          </div>
        </div>
        {/* reply */}
        <button
          onClick={() => setParentId(comment.id)}
          type="button"
          className="font-semibold text-blueAssuruur px-4 py-2 hover:opacity-70"
        >
          Balas
        </button>
      </div>
      <div>
        <p className="text-sm sm:text-base">{comment.body}</p>
      </div>
    </div>
  );
};

const CommentCardWithoutReply = ({
  comment,
}: {
  comment: CommentTypeWithUser;
}) => {
  return (
    <div className="space-y-6 border-b py-8">
      <div className="flex items-center justify-between">
        {/* user */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src={
                comment?.user?.image
                  ? `https://utfs.io/f/` + comment?.user?.image
                  : defaultUserImage
              }
              alt="default user image"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>{comment.username ?? comment?.user?.name}</b>
            <small>{format(new Date(comment.createdAt), "dd MMMM yyyy")}</small>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm sm:text-base">{comment.body}</p>
      </div>
    </div>
  );
};
