import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";


const HeaderPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
<section className="flex flex-row justify-center items-center w-full h-full pt-10 pb-10 bg-gray-100 relative z-0"> {/* z-0を追加 */}
  
  <div className="absolute right-0 mr-4 z-10"> {/* z-10を追加 */}
      <button
      onClick={handleClick}
      className="mr-4 bg-blue-900 text-white font-bold py-2 px-6 rounded transition-all duration-200 cursor-pointer hover:bg-blue-950 active:scale-95 hover:active:scale-95"
    >
      login
    </button>
  </div>

  <div className="font-bold text-blue-950 text-[25px] fixed top-6 left-5 w-full bhutuka-expanded-one-regular [font-family:bungee-shade-regular]">
    HATSUMEI
  </div>
</section>
  );
};

export default HeaderPage;







