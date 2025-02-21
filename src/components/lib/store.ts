"use client";

import { create } from "zustand";


interface Post {
  title: string;
  content: string;
  timestamp: number; 
}

interface PostStore {
  posts: Post[];
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  addPost: () => void;
}

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  title: "",
  content: "",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  addPost: () =>
    set((state) => {
      if (!state.title || !state.content) return state; // boşsa eklelmiyorum
      const newPost: Post = {
        title: state.title,
        content: state.content,
        timestamp: Date.now(), 
      };
      return {
        posts: [newPost, ...state.posts], // en yeni postu üste 
        title: "",
        content: "",
      };
    }),
}));
