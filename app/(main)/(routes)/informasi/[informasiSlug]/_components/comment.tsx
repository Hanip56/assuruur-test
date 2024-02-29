import { Comment as CommentType, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import defaultUserImage from "@/public/images/default-user.jpg";

const Comment = ({
  comment,
}: {
  comment: CommentType & { user: User | undefined };
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
        {/* reply */}
        <button className="font-semibold text-blueAssuruur px-4 py-2 hover:opacity-70">
          Reply
        </button>
      </div>
      <div>
        <p className="text-sm sm:text-base">{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;
