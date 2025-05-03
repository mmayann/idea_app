"use client";
import React, { useEffect, useState } from "react";
// import { useWindowSize } from "../../../../../hooks/GetWindowSize";
import { metos, idea_posts } from "../../../../../mocks/page";
import { IdeaPostType, MetoType } from "@/types/types";

interface LookHistoryPageProps {
  firebase_uid: string;
}

const LookHistoryPage: React.FC<LookHistoryPageProps> = ({ firebase_uid }) => {
  const [likedPosts, setLikedPosts] = useState<IdeaPostType[]>([]);
  const [currentMetos, setCurrentMetos] = useState<MetoType[]>(metos);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const postIds = currentMetos
        .filter((meto: MetoType) => meto.firebase_uid === firebase_uid) 
        .map((meto: MetoType) => meto.idea_post_id);

      const likedPosts = idea_posts.filter((post: IdeaPostType) =>
        postIds.includes(String(post.id))
      );

      setLikedPosts(likedPosts);
    };

    fetchLikedPosts();
  }, [currentMetos, firebase_uid]); 

  const handleDeleteMeto = (postId: string) => {
    const updatedMetos = currentMetos.filter(
      (meto: MetoType) => meto.idea_post_id !== postId || meto.user_id !== firebase_uid
    );
    setCurrentMetos(updatedMetos);
    setLikedPosts(likedPosts.filter((post) => post.id !== postId));
  };

  return (
    <section
      className="flex justify-center items-center bg-white mt-10 mr-10 -ml-12"
    >
      <div className="w-full max-w-4xl px-4 py-6 bg-gray-100">
        <h1 className="flex justify-center text-blue-950 font-bold mt-5 mb-10 text-2xl">
          Meto
        </h1>
        <ul className="space-y-4">
          {likedPosts.length > 0 ? (
            likedPosts.map((post, index) => {
              return (
                <li key={index} className="border-t border-white pt-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold">{post.title}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <p className="text-md mt-2">
                        {post.message.length > 40
                          ? post.message.substring(0, 40) + "..."
                          : post.message}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMeto(post.id)}
                      className="text-gray-700 hover:bg-blue-600 hover:text-white rounded-full py-1 px-2 bg-white"
                    >
                     cancel
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No Meto</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default LookHistoryPage;
