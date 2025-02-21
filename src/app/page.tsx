"use client";

import { formatTimestamp, usePostStore } from "@/components/lib/store";

export default function Home() {
  const posts = usePostStore((state) => state.posts);

  return (
    <div className="max-w-2xl transform translate-x-[120px] p-4">    
      <div className="space-y-4">
        {(
          posts           
            .map((post, index) => (
              <div key={index} className=" p-4 ">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p>{post.content}</p>
                <p className="text-gray-500 text-sm">{formatTimestamp(post.timestamp)}</p> 
              </div>
            ))
        )}
      </div>
    </div>
  );
}
