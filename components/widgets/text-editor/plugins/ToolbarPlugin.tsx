"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
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
} from "lucide-react";
import "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import {
  TOGGLE_LINK_COMMAND,
} from "@lexical/link";
import { Button } from "@/components/ui/button";
import { $createCodeNode } from "@lexical/code";


export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection?.hasFormat("code") ?? false);
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar();
          },
          { editor },
        );
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const BLOCK_OPTIONS: {
    label: string;
    value: "paragraph" | HeadingTag;
  }[] = [
    { label: "Paragraph", value: "paragraph" },
    { label: "Heading 1", value: "h1" },
    { label: "Heading 2", value: "h2" },
    { label: "Heading 3", value: "h3" },
    { label: "Heading 4", value: "h4" },
    { label: "Heading 5", value: "h5" },
    { label: "Heading 6", value: "h6" },
  ];

  return (
    <div className="flex-wrap gap-1 flex flex-row justify-center border-b border-black/15 p-2 sticky top-0 left-0 bg-card">
      {/* Undo / Redo */}
      <ToolbarButton
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        label="Undo"
      >
        <Undo size={16} />
      </ToolbarButton>

      <ToolbarButton
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        label="Redo"
      >
        <Redo size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      <select
  onChange={(e) => {
    const value = e.target.value;

    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      if (value === "paragraph") {
        $setBlocksType(selection, () => $createParagraphNode());
        return;
      }

      $setBlocksType(selection, () => $createHeadingNode(value as HeadingTag));
    });
  }}
  className="h-9 px-3 rounded border bg-white/50 text-black text-sm"
  defaultValue="paragraph"
>
  {BLOCK_OPTIONS.map((opt) => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>


      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
  onClick={() =>
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }
  label="Bullet List"
>
  <List size={16} />
</ToolbarButton>

<ToolbarButton
  onClick={() =>
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  }
  label="Numbered List"
>
  <ListOrdered size={16} />
</ToolbarButton>

<ToolbarButton
  onClick={() =>
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
  }
  label="Remove List"
>
  <ListMinus size={16} />
</ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      {/* Text formatting */}
      <ToolbarButton
        active={isBold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        label="Bold"
      >
        <Bold size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={isItalic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        label="Italic"
      >
        <Italic size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={isUnderline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        label="Underline"
      >
        <Underline size={16} />
      </ToolbarButton>

      <ToolbarButton
        active={isStrikethrough}
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        label="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
  onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "uppercase")}
  label="Uppercase"
>
  AB
</ToolbarButton>

<ToolbarButton
  onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "lowercase")}
  label="Lowercase"
>
  aa
</ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
        active={isCode}
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
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        label="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        label="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        label="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
        label="Justify"
      >
        <AlignJustify size={16} />
      </ToolbarButton>

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
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
  🔗
</ToolbarButton>

    </div>
  );
}

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
