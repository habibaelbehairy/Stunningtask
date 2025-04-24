import { useState, useEffect, useRef } from "react";

import { Dimensions } from "../types/Dimensions";
import { EditableTextHookProps } from "../types/EditableTextHookProps";

export const useEditableText = ({
  initialValue,
  onChange,
}: EditableTextHookProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (containerRef.current && !isEditing) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      onChange(value);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();

      // Position cursor at the end of the text
      const length = value.length;
      if (
        inputRef.current instanceof HTMLInputElement ||
        inputRef.current instanceof HTMLTextAreaElement
      ) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = length;
            inputRef.current.selectionEnd = length;
          }
        }, 0);
      }
    }
  }, [isEditing, value.length]);

  return {
    isEditing,
    value,
    inputRef,
    containerRef,
    dimensions,
    handleStartEdit,
    handleChange,
    handleBlur,
    handleKeyDown,
  };
};
