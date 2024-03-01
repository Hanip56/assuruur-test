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

type Props = { quote: string; url: string };

const ShareSosmed = ({ quote, url }: Props) => {
  quote = quote + " | Ponpes Assuruur";

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
