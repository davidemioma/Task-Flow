"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormErrors from "./FormErrors";
import { useFormStatus } from "react-dom";

interface Props {
  id: string;
  type?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  errors?: Record<string, string[] | undefined>;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      type,
      label,
      required,
      disabled,
      placeholder,
      className,
      errors,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              className="text-xs text-neutral-700 font-semibold"
              htmlFor={id}
            >
              {label}
            </Label>
          )}

          <Input
            className={cn("h-7 px-2 py-1 text-sm", className)}
            ref={ref}
            id={id}
            name={id}
            type={type}
            required={required}
            disabled={disabled || pending}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onBlur={onBlur}
            aria-describedby={`${id}-error`}
          />
        </div>

        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
