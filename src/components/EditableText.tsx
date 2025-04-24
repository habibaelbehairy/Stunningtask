import React from "react";
import { useEditableText } from "../hooks/useEditable";
import { EditableTextProps } from "../types/EditableTextContent";

const EditableText: React.FC<EditableTextProps> = ({
  initialValue,
  onChange,
  className = "",
  as = "p",
}) => {
  const {
    isEditing,
    value,
    inputRef,
    containerRef,
    dimensions,
    handleStartEdit,
    handleChange,
    handleBlur,
    handleKeyDown
  } = useEditableText({ initialValue, onChange });

  // Common container that maintains dimensions in both edit and display modes
  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        minWidth: isEditing ? `${dimensions.width}px` : "auto",
        minHeight: isEditing ? `${dimensions.height}px` : "auto",
      }}
    >
      {isEditing ? (
        as === "p" || as === "h1" || as === "h2" || as === "h3" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${className} outline-dashed outline-2 outline-blue-400 px-2 py-1 rounded w-full`}
            rows={as === "p" ? 3 : 2}
            style={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",
              resize: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${className} outline-dashed outline-2 outline-blue-400 px-2 py-1 rounded w-full`}
            style={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        )
      ) : (
        React.createElement(
          as,
          {
            className: `${className} cursor-pointer`,
            onClick: handleStartEdit,
          },
          value
        )
      )}
    </div>
  );
};

export default EditableText;