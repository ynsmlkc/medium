"use client";

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import React, { useEffect } from "react";
import { usePostStore } from "../lib/store";

const Cloud = () => {
  const setImageUrl = usePostStore((state) => state.setImageUrl); 
  const imageUrl = usePostStore((state) => state.imageUrl)
  

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setImageUrl(storedImage);
    }
  }, []);

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.event === "success") {
      const info = result.info as { secure_url?: string };

      if (info.secure_url) {
        setImageUrl(info.secure_url); 
        localStorage.setItem("uploadedImage", info.secure_url);
      }
    }
  };
  console.log(imageUrl)

  return (
    <main className="p-8 ">
      <h1 className="text-2xl font-medium ">
        <section className="">
          <CldUploadWidget uploadPreset="next_cloudinary_app" onSuccess={handleUploadSuccess}>
            {({ open }) => <button onClick={() => open()}>Upload an Image</button>}
          </CldUploadWidget>

          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Uploaded" className="h-[300px] object-cover mt-2" />
            </div>
          )}
        </section>
      </h1>
    </main>
  );
};

export default Cloud;
