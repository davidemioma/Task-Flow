"use client";

import React, { KeyboardEventHandler, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import FormErrors from "./FormErrors";
import { useFormStatus } from "react-dom";
import { Textarea } from "../ui/textarea";

interface Props {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  errors?: Record<string, string[] | undefined>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      label,
      required,
      disabled,
      placeholder,
      className,
      defaultValue,
      onBlur,
      onClick,
      errors,
      onKeyDown,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label && (
            <Label
              className="text-xs text-neutral-700 font-semibold"
              htmlFor={id}
            >
              {label}
            </Label>
          )}

          <Textarea
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            id={id}
            name={id}
            ref={ref}
            placeholder={placeholder}
            required={required}
            disabled={pending || disabled}
            defaultValue={defaultValue}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-describedby={`${id}-error`}
          />
        </div>

        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
