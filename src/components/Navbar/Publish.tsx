"use client";

import { useRouter } from "next/navigation";
import { usePostStore } from "../lib/store";
import { useEffect } from "react";
import { useState } from "react";

// Bileşenin dışına taşıyoruz
export const handlePublish = (router: ReturnType<typeof useRouter>) => {
  const title = usePostStore.getState().title;
  const content = usePostStore.getState().content;
  const addPost = usePostStore.getState().addPost;


  if (title.trim() && content.trim() ) {
    addPost();
    router.push("/");
  }
};



export default function Publish() {
  const router = useRouter();
  const title = usePostStore((state) => state.title);
  const content = usePostStore((state) => state.content);
  const imageUrl = usePostStore((state) => state.imageUrl)
  const setTitle = usePostStore((state) => state.setTitle);
  const setContent = usePostStore((state) => state.setContent);
  const setImageUrl = usePostStore((state) => state.setImageUrl)
  const [isPublished, setIsPublished] = useState(false);

  /* Title */

  useEffect(() => {
    if (!isPublished) {  //  Eğer yayınlanmadıysa, önceki başlığı getir
      const storedTitle = localStorage.getItem("savedTitle");
      if (storedTitle) {
        setTitle(storedTitle);
      }
    }
  }, [isPublished, setTitle]);

  

  /* Content */

  useEffect(() => {
    if (!isPublished) {  //  Eğer yayınlanmadıysa, önceki içeriği getir
      const storedContent = localStorage.getItem("savedContent");
      if (storedContent) {
        setContent(storedContent);
      }
    }
  }, [isPublished, setContent]);

  

   /* Image Url */

   useEffect(() => {
    if (!isPublished) {  //  Eğer yayınlanmadıysa, önceki başlığı getir
      const storedImageUrl = localStorage.getItem("uploadedImage");
      if (storedImageUrl) {
        setImageUrl(storedImageUrl);
      }
    }
  }, [isPublished, setImageUrl]);


  /*  Publish İşlemi */
  const handlePublishClick = () => {
    if (title.trim() && content.trim()) {
      handlePublish(router);  //  Yayınlama işlemini çağır
      
      /* To do : json kaydetme fonksiyonu gelcek  */
      const newPost = {
        id: Date.now(),
        title,
        content,
        imageUrl,
        timestamp: Date.now(),
      };

      const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]"); // Eski postları al
      const updatedPosts = [newPost, ...existingPosts]; // Yeni postu ekle
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // JSON olarak kaydet

      console.log("Kaydedilen JSON:", updatedPosts); // Kontrol için log

      setIsPublished(true);  // Yayınlandığını işaretle
      setTitle("");  // Title sıfırla
      setContent("");  //  Content sıfırla
      setImageUrl("");
      localStorage.removeItem("savedTitle");  //  LocalStorage'dan da temizle
      localStorage.removeItem("savedContent");
      localStorage.removeItem("uploadedImage");
 
    } 
    else {
      // Eğer content boşsa, sadece title'ı sıfırlamadan bırak
      if (!content.trim()) {
        setContent("");  // content'i sıfırla
        localStorage.removeItem("savedContent");
      }
    }
  };


  return (
    <div>
      <button
        onClick={handlePublishClick} // router'ı parametre olarak geçiyoruz
        className="bg-green-600 text-white px-4 py-2 rounded-full "
      >
        Publish
      </button>
    </div>
  );
}
