"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { addIdeaPost } from "@/app/server/ideaPost";
import { IdeaPostType } from "@/types/types";

export default function IdeaPostPage() {
  const router = useRouter(); 
  const form = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [main_category, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false); 

  const toggleForm = () => setIsFormOpen(!isFormOpen); 

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if ( !title || !message || !main_category || !subCategory) {
      alert("すべてのフィールドを入力してください");
      return;
    }

    const newIdeaPost: IdeaPostType = {
      id: "newId",
      user_id: "sampleUserId",
      title: title,
      message: message,
      date: new Date().toISOString(),
      main_category: main_category,
      sub_category: subCategory,
    };

    try {
      const addedPost = await addIdeaPost(newIdeaPost);
      console.log("新しい投稿が追加されました", addedPost);
      router.push("/idea-posts");
    } catch (error) {
      if (error instanceof Error) {
        alert("投稿に失敗しました：" + error.message);
      } else {
        alert("投稿に失敗しました：不明なエラーが発生しました");
      }
    }
  };

  return (
    <section
      id="contact"
      className="bg-white px-8 py-20 flex flex-col items-center"
    >
      <div>
      <button
        type="button"
        className="text-3xl bg-gray-100  text-indigo-950 py-5 px-15 rounded-full transition-all duration-700 hover:bg-blue-950 hover:text-white"
        onClick={toggleForm}
      >
        Your Idea Posts {isFormOpen ? "💡" : "▼"}
      </button>      
      </div>
      
      {isFormOpen && (

        <form
          ref={form}
          className="w-full mt-7 max-w-lg flex flex-col space-y-6"
          onSubmit={handleSubmit}
        >
              <label
                htmlFor="main_category"
                className="block mb-2 text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="main_category"
              className="w-full h-10 border-b border-gray-500 bg-white px-3 focus:border-b-2 focus:border-b-blue-900 focus:outline-none"
                value={main_category}
                onChange={(e) => setMainCategory(e.target.value)}
                name="main_category"
              />


            <label htmlFor="sub_category" className="block mb-2 text-gray-700">
              Sub Category
            </label>
            <input
              type="text"
              id="sub_category"
              className="w-full h-10 border-b border-gray-500 bg-white px-3 focus:border-b-2 focus:border-b-blue-900 focus:outline-none"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              name="sub_category"
            />
 

          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2 text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full h-10 border-b border-gray-500 bg-white px-3 focus:border-b-2 focus:border-b-blue-900 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-2 text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              className="w-full h-10 pt-5 pb-20 border border-gray-500 bg-white px-3 focus:border-2 focus:border-blue-900 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-full font-bold max-w-xs bg-gray-100 text-gray-800 py-3 border-2 border-transparent rounded-full transition-colors duration-300 hover:border-blue-800 active:font-extrabold"
            >
              POST
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
