"use client";

import { create } from "zustand";
import { useEffect } from "react";

interface Post {
  id: number; 
  title: string;
  content: string;
  imageUrl: string;
  timestamp: number;
} 

interface PostStore {
  posts: Post[];
  title: string;
  content: string;
  imageUrl: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImageUrl: (imageUrl: string) => void;
  addPost: () => void;
  deletePost: (postId: number) => void; 
}

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  title: "",
  content: "",
  imageUrl: "",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  addPost: () =>
    set((state) => {
      if (!state.title || !state.content || !state.imageUrl) return state; 
      const newPost: Post = {
        id: Date.now(), 
        title: state.title,
        content: state.content,
        imageUrl: state.imageUrl,
        timestamp: Date.now(),
      };

      const updatedPosts = [newPost, ...state.posts];
      

      return {
        posts: updatedPosts, 
        content: "", 
        title:"",    
        imageUrl: "",   
      };
    }),

    
  deletePost: (postId) =>
    set((state) => {
      const updatedPosts = state.posts.filter((post) => post.id !== postId);

      localStorage.setItem("posts", JSON.stringify(updatedPosts)); 

      return { posts: updatedPosts };
    }),
}));

export const useLoadPosts = () => {
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      usePostStore.setState({ posts: JSON.parse(storedPosts) });
    }
  }, []);
};
