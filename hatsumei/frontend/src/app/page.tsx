"use client";
import AllPostPage from "./publicPages/allPosts/page";
import RecruitedPage from "./publicPages/recruited/page";
import FooterPage from "./components/layouts/footer";
import HeaderPage from "./components/layouts/header";
import { useWindowSize } from "../../hooks/GetWindowSize";
import ScrollToTopButton from "./components/elements/buttons/HomeButton";

export default function Home() {
  const { width } = useWindowSize();
  return (
    <div
      className={`flex flex-col  h-aute w-[${width}px] justify-center items-center`}
    >
      <div className="w-full sticky top-0 z-10">
        <HeaderPage />
      </div>
      <div className="w-full mb-25" >
      <RecruitedPage />
      <AllPostPage />
      <ScrollToTopButton />
      </div>
      <FooterPage />
    </div>
  );
}
