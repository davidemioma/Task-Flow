import React from "react";
import { XCircle } from "lucide-react";

interface Props {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors = ({ id, errors }: Props) => {
  if (!errors) return null;

  return (
    <div
      className="mt-2 text-xs text-rose-500"
      id={`${id}-error`}
      aria-live="polite"
    >
      {errors?.[id]?.map((err: string) => (
        <div
          key={err}
          className="bg-rose-500/10 flex items-center p-2 font-medium border border-rose-500 rounded-sm"
        >
          <XCircle className="h-4 w-4 mr-2" />

          {err}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
