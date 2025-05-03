"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { users, idea_posts } from "../../../../mocks/page";

const RecruitedPage = () => {

  const images = [
    "/irasto/買い物.png",
    "/irasto/とまと.png",
    "/irasto/自販機.png",
    "/irasto/自転車.png",
    "/irasto/イヤホン.png",
    "/irasto/カラオケ.png",
  ];

  return (
    <section className="mt-28 ">
      <div className="flex justify-center items-center py-5 mt-10 text-3xl border-t-blue-950 border-b-blue-300 border-b-8 rampart-one-regular text-blue-950 font-bold">

      Ideas realized
  
      </div>

      <div className="flex justify-center items-center mb-20 bg-white relative">
        <div className="px-3 max-w-screen-xl w-full">
          <div className="scroll-infinity__wrap">
            <ul className="scroll-infinity__list scroll-infinity__list--left">
              {idea_posts.map((post, index) => {
                const user = users.find((u) => u.id === Number(post.user_id));
                const image = images[index % images.length];

                return (
                  <li key={post.id} className="scroll-infinity__item">
                    <div className="relative">
                      <Link href={`/post/${post.id}`}>
                        <Image
                          src={image}
                          alt="投稿画像"
                          width={400}
                          height={200}
                          className="w-full h-[200px] object-cover rounded-t-lg cursor-pointer"
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <div className="mt-2 text-sm text-gray-500">
                          by {user?.nickname}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              {idea_posts.map((post, index) => {
                const user = users.find((u) => u.id === Number(post.user_id));
                const image = images[index % images.length];

                return (
                  <li key={`duplicate-${post.id}`} className="scroll-infinity__item">
                    <div className="relative">
                      <Link href={`/post/${post.id}`}>
                        <Image
                          src={image}
                          alt="投稿画像"
                          width={400}
                          height={200}
                          className="w-full h-[200px] object-cover rounded-t-lg cursor-pointer"
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <div className="mt-2 text-sm text-gray-500">
                           {user?.first_name}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitedPage;
