"use client";
import React, { useState, useEffect } from "react"; 
import { useWindowSize } from "../../../../hooks/GetWindowSize";
import { users } from "../../../../mocks/page";
import { fetchIdeaPosts } from "../../server/ideaPost"; 
import { IdeaPostType } from "../../../types/types"; 

const AllPostPage = () => {
  const { height, width } = useWindowSize();
  const [likes, setLikes] = useState<number[]>([]);
  const [posts, setPosts] = useState<IdeaPostType[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ideaPosts = await fetchIdeaPosts();
        setPosts(ideaPosts);
        setLikes(ideaPosts.map(() => 0)); 
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchData();
  }, []); 

  const handleLike = (index: number) => {
    const newLikes = [...likes];
    newLikes[index]++;
    setLikes(newLikes);
  };

  return (
    <section
    className={`flex justify-center items-center h-[${height}px] w-[${width}px] bg-white -ml-12`}
    >
      <div className="w-full max-w-4xl px-4 py-6">
        <h1 className="flex justify-center text-3xl mb-12 text-blue-950">
          All Posts
        </h1>
        <ul className="space-y-4 mt-3">
          {posts.slice(0, 5).map((post, index) => {
            const user = users.find((u) => String(u.id) === String(post.user_id));

            return (
              <li key={index} className="border-b pb-2">
                <div className="text-lg font-bold">{post.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()} by{" "}
                  {user?.first_name || "匿名"}
                </div>
                <p className="text-md mt-2">
                  {post.message.length > 40
                    ? post.message.substring(0, 40) + "..."
                    : post.message}
                </p>
                <div className="mt-4 flex items-center">
                  <button
                    className="border border-yellow-300 text-yellow-500 bg-white font-bold py-0.5 px-4 rounded-full transition-colors duration-200 active:bg-yellow-500 active:text-white"
                    onClick={() => handleLike(index)}
                  >
                    Meto
                  </button>
                  <span className="ml-2"> {likes[index]}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AllPostPage;