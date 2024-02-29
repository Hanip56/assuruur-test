import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import { format } from "date-fns";

const CommentPage = async () => {
  const comments = await db.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    username: comment.username ?? comment?.user?.name + " (admin)",
    email: comment.email,
    comment: comment.body,
    date: format(new Date(comment.createdAt), "dd-MM-yyyy"),
    isApprove: comment.isApprove,
    informasiId: comment.articleId,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Comments" description="Manage your comments" />
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedComments} />
    </Container>
  );
};

export default CommentPage;
