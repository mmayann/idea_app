"use client";

import IdeaPostsPage from "@/app/memberPages/[firebase_uid]/ideaPosts/page";
import LookHistoriesPage from "@/app/memberPages/[firebase_uid]/metoHistories/page";
import RecruitedPage from "@/app/publicPages/recruited/page";
import AllPostPage from "@/app/publicPages/allPosts/page";
import ContactsPage from "@/app/memberPages/[firebase_uid]/contacts/page";
import FooterPage from "@/app/components/layouts/footer";
import { useWindowSize } from "../../../../hooks/GetWindowSize";
import MembersHeaderPage from "./membersHeader";
import { useState, useEffect } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import SearchPosts from "./SearchPosts";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { users } from "../../../../mocks/page";

export default function MemberPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;


        const mockUser = users.find((u) => u.firebase_uid === uid);

        if (mockUser) {
          setUsername(mockUser.first_name || "名前なし");
          setLoading(false);
        } else {

          try {
            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUsername(userData.username || "名前なし");
            } else {
              setUsername("ユーザーデータがありません");
              setError("ユーザー情報がデータベースに存在しません");
            }
          } catch (error: unknown) {
            setUsername("データ取得失敗");
            if (error instanceof Error) {
              setError(`エラー: ${error.message}`);
            } else {
              setError("不明なエラーが発生しました");
            }
          } finally {
            setLoading(false);
          }
        }
      } else {
        setUsername("ログインしてください");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <p className="text-center p-4">ユーザー情報を読み込み中...</p>;
  }

  return (
    <div
      className={`flex flex-col h-auto w-[${width}px] justify-center items-center`}
    >
      <div className="w-full sticky top-0 z-10">
        <MembersHeaderPage />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <p className="text-xl my-4">{username}さんのページ</p>
      <div className="w-full mb-20">
        <SearchPosts />
      </div>
      <div className="w-full">
        <div className="flex flex-col md:flex-row">
          <div id="allPostPage" className="w-full md:w-3/4">
            <AllPostPage />
          </div>
          <div
            id="lookHistoriesPage"
            className="w-full md:w-1/4 mr-0 md:mr-11 mt-10"
          >
            <LookHistoriesPage />
          </div>
        </div>

        <div id="ideaPostsPage">
          <IdeaPostsPage />
        </div>

        <div id="recruitedPage">
          <RecruitedPage />
        </div>
        <div id="contactPages">
          <ContactsPage />
        </div>
        <ScrollToTopButton />
      </div>
      <div className="w-full h-[20px]">
        <FooterPage />
      </div>
    </div>
  );
}