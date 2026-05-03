"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function ExternalLinkPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const dom = editor.getRootElement();

        if (!dom) return;

        const links = dom.querySelectorAll("a");

        links.forEach((link) => {
          const href = link.getAttribute("href");

          if (!href) return;

          // Only apply once
          if (!link.getAttribute("data-processed")) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
            link.setAttribute("data-processed", "true");
          }
        });
      });
    });
  }, [editor]);

  return null;
}