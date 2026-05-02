"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  LexicalNode,
} from "lexical";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code,
  List,
  ListOrdered,
  ListMinus,
  CodeXml,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

import "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
} from "@lexical/rich-text";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  ListNode,
} from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { Button } from "@/components/ui/button";
import { $createCodeNode } from "@lexical/code";
import { $isLinkNode } from "@lexical/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TextAlignment = "left" | "center" | "right" | "justify";

type ToolbarState = {
  history: {
    canUndo: boolean;
    canRedo: boolean;
  };
  textStyle: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
  };
  transform: {
    uppercase: boolean;
    lowercase: boolean;
    capitalize: boolean;
  };
  list: {
    bullet: boolean;
    number: boolean;
  };
  block: {
    alignment: TextAlignment;
    type: "paragraph" | "quote" | HeadingTag;
  };
  link: {
    active: boolean;
  };
};

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [toolbar, setToolbar] = useState<ToolbarState>({
    history: {
      canUndo: false,
      canRedo: false,
    },
    textStyle: {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      code: false,
    },
    transform: {
      uppercase: false,
      lowercase: false,
      capitalize: false,
    },
    list: {
      bullet: false,
      number: false,
    },
    block: {
      alignment: "left",
      type: "paragraph",
    },
    link: {
      active: false,
    },
  });

  const BLOCK_OPTIONS = useMemo(
    () => [
      { label: "Paragraph", value: "paragraph" },
      { label: "Heading 1", value: "h1", icon: Heading1 },
      { label: "Heading 2", value: "h2", icon: Heading2 },
      { label: "Heading 3", value: "h3", icon: Heading3 },
      { label: "Heading 4", value: "h4", icon: Heading4 },
      { label: "Heading 5", value: "h5", icon: Heading5 },
      { label: "Heading 6", value: "h6", icon: Heading6 },
    ],
    [],
  );

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    const anchorNode = selection.anchor.getNode();
    const element = anchorNode.getTopLevelElementOrThrow();

    // Detect list type
    const listNode = $getNearestNodeOfType(element, ListNode);
    const bullet = listNode?.getListType() === "bullet";
    const number = listNode?.getListType() === "number";

    // Detect alignment
    let alignment: ToolbarState["block"]["alignment"] = "left";
    if ($isElementNode(element)) {
      const format = element.getFormatType();
      if (["center", "right", "justify"].includes(format)) {
        alignment = format as TextAlignment;
      }
    }

    // Detect block type
    const blockType = $isHeadingNode(element)
      ? (element.getTag() as ToolbarState["block"]["type"])
      : $isQuoteNode(element)
        ? "quote"
        : "paragraph";

    // Detect link state
    const isLinkActive = selection.getNodes().some((node) => {
      let current: LexicalNode | null = node;
      while (current) {
        if ($isLinkNode(current)) return true;
        current = current.getParent();
      }
      return false;
    });

    const isQuote = $isQuoteNode(element);

    // Single State Update
    setToolbar((prev) => ({
      ...prev,
      textStyle: {
        bold: selection.hasFormat("bold"),
        italic: selection.hasFormat("italic"),
        underline: selection.hasFormat("underline"),
        strikethrough: selection.hasFormat("strikethrough"),
        code: selection.hasFormat("code"),
        quote: isQuote,
      },
      transform: {
        uppercase: selection.hasFormat("uppercase"),
        lowercase: selection.hasFormat("lowercase"),
        capitalize: selection.hasFormat("capitalize"),
      },
      list: { bullet, number },
      block: { alignment, type: blockType },
      link: { active: isLinkActive },
    }));
  }, []);

  // Editor Event Bindings
  useEffect(() => {
    return mergeRegister(
      // Runs on every editor state change
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => $updateToolbar());
      }),

      // Runs when selection changes
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),

      // Undo state
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setToolbar((prev) => ({
            ...prev,
            history: { ...prev.history, canUndo: payload },
          }));
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),

      // Redo state
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setToolbar((prev) => ({
            ...prev,
            history: {
              ...prev.history,
              canRedo: payload,
            },
          }));
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="flex-wrap gap-1 flex flex-row justify-center border-b border-black/15 p-2 sticky top-0 left-0 bg-card">
      {/* History */}
      <ToolbarButton
        disabled={!toolbar.history.canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        label="Undo"
      >
        <Undo size={16} />
      </ToolbarButton>

      <ToolbarButton
        disabled={!toolbar.history.canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        label="Redo"
      >
        <Redo size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Block Type */}
      <Select
        value={toolbar.block.type}
        onValueChange={(value) => {
          editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            if (value === "paragraph") {
              $setBlocksType(selection, () => $createParagraphNode());
              return;
            }

            $setBlocksType(selection, () =>
              $createHeadingNode(value as HeadingTag),
            );
          });
        }}
      >
        <SelectTrigger className="min-h-9 w-fit px-3 rounded border bg-white/50! transition text-black text-sm">
          <SelectValue placeholder="Select block type" className="bg-red-500" />
        </SelectTrigger>

        <SelectContent position="popper">
          {BLOCK_OPTIONS.map((opt) => {
            const Icon = opt.icon;

            return (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="flex items-center gap-2"
              >
                {Icon ? (
                  <>
                    <Icon size={16} />
                    <span className="hidden">{opt.label}</span>
                  </>
                ) : (
                  <span>{opt.label}</span>
                )}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Lists */}
      <ToolbarButton
        active={toolbar.list.bullet}
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        label="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.list.number}
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        label="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
        label="Remove List"
      >
        <ListMinus size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Text formatting */}
      <ToolbarButton
        active={toolbar.textStyle.bold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        label="Bold"
      >
        <Bold size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.textStyle.italic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        label="Italic"
      >
        <Italic size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.textStyle.underline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        label="Underline"
      >
        <Underline size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.block.type === "quote"}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            $setBlocksType(selection, () => $createQuoteNode());
          });
        }}
        label="Quote"
      >
        ❝
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.textStyle.strikethrough}
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        label="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Text Transform */}
      <ToolbarButton
        active={toolbar.transform.uppercase}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "uppercase")}
        label="Uppercase"
      >
        AB
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.transform.lowercase}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "lowercase")}
        label="Lowercase"
      >
        aa
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.transform.capitalize}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            const text = selection.getTextContent();

            const capitalized = text
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase());

            selection.insertText(capitalized);
          });
        }}
        label="Capitalize"
      >
        Aa
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Code Blocks */}
      <ToolbarButton
        active={toolbar.textStyle.code}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        label="Inline Code"
      >
        <Code size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createCodeNode());
            }
          });
        }}
        label="Code Block"
      >
        <CodeXml size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Alignment */}
      <ToolbarButton
        active={toolbar.block.alignment === "left"}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        label="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.block.alignment === "center"}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        label="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.block.alignment === "right"}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        label="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={toolbar.block.alignment === "justify"}
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
        label="Justify"
      >
        <AlignJustify size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Link */}
      <ToolbarButton
        active={toolbar.link.active}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            const url = prompt("Enter URL");
            if (!url) return;

            editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
          });
        }}
        label="Link"
      >
        <Link size={16} />
      </ToolbarButton>
    </div>
  );
}

// Button Component
function ToolbarButton({
  active,
  disabled,
  onClick,
  children,
  label,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`size-9 rounded border shadow transition
          ${active ? "bg-black/75 text-white hover:text-black" : "bg-white/50 text-black"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
        `}
    >
      {children}
    </Button>
  );
}
