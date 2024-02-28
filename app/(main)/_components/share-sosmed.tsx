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

type Props = {};

const ShareSosmed = () => {
  const pathname = usePathname();

  const url = window.location.href;

  return (
    <div className="flex gap-2 items-center">
      <FacebookShareButton
        url={url}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
        blankTarget={true}
      >
        <FacebookIcon size={24} round />
      </FacebookShareButton>
      <WhatsappShareButton
        url={url}
        title={"next-share is a social share buttons for your next React apps."}
        separator=":: "
        blankTarget={true}
      >
        <WhatsappIcon size={24} round />
      </WhatsappShareButton>
      <TwitterShareButton url={url} blankTarget={true}>
        <TwitterIcon size={24} round />
      </TwitterShareButton>
      <EmailShareButton url={url} blankTarget={true}>
        <EmailIcon size={24} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareSosmed;
