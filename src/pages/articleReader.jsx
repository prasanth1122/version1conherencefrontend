import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // For accessing URL params
import {
  fetchArticleById,
  resetArticleState,
} from "../store/redux/slices/articleSlice.jsx";
import { FaShareAlt } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { FaBookBookmark } from "react-icons/fa6";

export default function ArticleReader() {
  const { isSidebarOpen } = useGlobalContext();

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth mt-24 flex flex-col items-center gap-4">
        <section className="w-full h-44  flex flex-col items-start lg:flex-row lg:items-start lg;gap-4 ">
          <section className="w-full lg:w-2/3 h-full bg-highlight_background rounded-xl p-4 flex flex-col items-start justify-between">
            <p className="text-2xl font-bold text-important_text">
              Heading of the Article
            </p>
            <p className="text-base">Nature - Health</p>
            <div className="flex items-center gap-8">
              <p>#tags</p>
              <p>#tags</p>
              <p>#tags</p>
              <p>#tags</p>
            </div>
            <div className="flex w-full items-center gap-8">
              <AiOutlineLike style={{ fill: "black", width: "25px" }} />
              <AiOutlineDislike style={{ fill: "black", width: "25px" }} />
              <FaShareAlt style={{ fill: "black", width: "25px" }} />
              <FaBookBookmark style={{ fill: "black", width: "25px" }} />
            </div>
          </section>
          <section className="w-full lg:flex-1 lg:w-0 lg:ml-4 p-4 h-full bg-terinary rounded-xl flexflex-col items-start justify-between">
            <p className="text-lg font-bold">Multiple</p>
            <p className="text-base">IEEE & Nature</p>
            <p className="text-base">Cite : https://hastags</p>
          </section>
        </section>
        <section className="w-full flex flex-col items-start lg:flex-row lg:items-start min-h-96 ">
          <section className="w-full lg:w-2/3 flex flex-col items-start gap-4">
            <div className="w-full min-h-36 rounded-xl bg-important_text shadow-card_shadow text-white p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </div>
            <div className="w-full h-96 rounded-xl bg-highlight_background border-2"></div>
          </section>
          <section className="w-full lg:flex-1 lg:w-0 lg:ml-4 gap-4 p-4 h-full bg-highlight_background rounded-xl flex flex-col items-start justify-between">
            <p className="text-2xl font-bold">Similar Articles</p>
            <div className="flex flex-col items-start w-full h-36 bg-terinary rounded-xl"></div>
            <div className="flex flex-col items-start w-full h-36 bg-terinary rounded-xl"></div>
            <div className="flex flex-col items-start w-full h-36 bg-terinary rounded-xl"></div>
          </section>
        </section>
        <section className="w-full flex flex-col items-start bg-highlight_background p-4 rounded-xl">
          <p className="text-2xl font-bold">Comments:</p>
          <div className="w-full flex flex-col items-start gap-4 mt-2">
            <div className="w-full flex flex-col items-start gap-4 p-2 bg-primary rounded-xl text-white">
              <p className="text-lg font-bold ">John Doe</p>
              <p className="text-base">Comments here</p>
            </div>
            <div className="w-full flex flex-col items-start gap-4 p-2 bg-primary rounded-xl text-white">
              <p className="text-lg font-bold ">John Doe</p>
              <p className="text-base">Comments here</p>
            </div>
            <div className="w-full flex flex-col items-start gap-4 p-2 bg-primary rounded-xl text-white">
              <p className="text-lg font-bold ">John Doe</p>
              <p className="text-base">Comments here</p>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
