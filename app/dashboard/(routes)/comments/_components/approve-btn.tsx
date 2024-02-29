"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ApproveBtn = ({
  commentId,
  isApproved,
}: {
  commentId: string;
  isApproved: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/comments/${commentId}`, { isApprove: true });
      toast.success(`Comment with id ${commentId} has been approved.`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to approve comment.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="text-xs bg-green-600 disabled:bg-gray-500"
          size={"sm"}
          onClick={() => setOpen(true)}
          disabled={isApproved}
        >
          {isApproved ? "Approved" : "Approve"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approval Comment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Approve this comment? This will make the comment show in public.
        </DialogDescription>
        <DialogFooter>
          <div className="w-full pt-6 flex items-center justify-end gap-2">
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="default"
              onClick={handleConfirm}
              className="bg-green-600"
            >
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveBtn;
