"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

const FormSubmit = ({
  children,
  className,
  disabled,
  variant = "primary",
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn("", className)}
      type="submit"
      size="sm"
      variant={variant}
      disabled={pending || disabled}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
