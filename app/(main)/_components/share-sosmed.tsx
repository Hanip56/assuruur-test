"use client";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import { usePathname } from "next/navigation";

type Props = { quote: string };

const ShareSosmed = ({ quote }: Props) => {
  const pathname = usePathname();
  const url = `${process.env.BASE_URL}${pathname}`;

  return (
    <div className="flex gap-2 items-center">
      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon size={24} round />
      </FacebookShareButton>
      <WhatsappShareButton
        url={url}
        title={quote}
        separator=":: "
        blankTarget={true}
      >
        <WhatsappIcon size={24} round />
      </WhatsappShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={24} round />
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={24} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareSosmed;
