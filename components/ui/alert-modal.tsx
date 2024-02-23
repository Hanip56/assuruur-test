import Modal from "./modal";
import { Button } from "./button";

type AlertModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: AlertModalProps) => {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full pt-6 flex items-center justify-end gap-2">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
