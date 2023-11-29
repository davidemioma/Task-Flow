"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";
import { unsplash } from "@/lib/unsplash";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import { defaultImages } from "@/constants/images";

interface Props {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: Props) => {
  const { pending } = useFormStatus();

  const [isLoading, setIsLoading] = useState(true);

  const [selectedImageId, setSelectedImageId] = useState(null);

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (res && res.response) {
          const newImages = res.response as Array<Record<string, any>>;

          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (err) {
        console.log(err);

        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((img) => (
          <div
            key={img.id}
            className={cn(
              "relative group bg-muted aspect-video cursor-pointer hover:opacity-75 transition",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;

              setSelectedImageId(img.id);
            }}
          >
            <input
              className="hidden"
              id={id}
              name={id}
              type="radio"
              checked={selectedImageId === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />

            <Image
              className="object-cover rounded-sm"
              src={img.urls.thumb}
              fill
              alt="Unsplash image"
            />

            <Link
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
              href={img.links.html}
              target="_blank"
            >
              {img.user.name}
            </Link>

            {selectedImageId === img.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      <FormErrors id={id} errors={errors} />
    </div>
  );
};

export default FormPicker;
