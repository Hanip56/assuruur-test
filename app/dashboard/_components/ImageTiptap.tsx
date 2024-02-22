import { Image as ImageTiptap } from "@tiptap/extension-image";
import Image from "next/image";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";

function ImageNode(props: NodeViewProps) {
  const { src, alt } = props.node.attrs;
  console.log({ attrs: props.node.attrs });

  let className = "image";
  if (props.selected) {
    className += " ProseMirror-selectednode";
  }

  return (
    <NodeViewWrapper className={className} data-drag-handle>
      <div className="flex">
        <img src={src} alt={alt} />
        <span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, eius
          inventore? Tempore perspiciatis reprehenderit fugiat, animi, repellat
          molestias a, recusandae odio ex sint eius blanditiis ipsam mollitia.
          Hic numquam quas officia veniam debitis, autem atque placeat! Est
          repudiandae similique at eos qui? Provident modi praesentium possimus
          atque animi vero quibusdam non! Incidunt labore recusandae optio
          molestias mollitia beatae. Sed sunt aliquid architecto cumque! Iusto
          dolores suscipit distinctio perferendis veritatis dolorum minima velit
          est facilis porro minus esse dolorem, recusandae cum. Non iste
          blanditiis ipsum nam? Eveniet alias enim eaque architecto maiores,
          necessitatibus debitis vitae corporis veritatis fuga totam omnis
          aliquid.
        </span>
      </div>
    </NodeViewWrapper>
  );
}

export default ImageTiptap.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
});
