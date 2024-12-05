import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import CollectionCard from "../components/NewLibraryCards/collectionCard.jsx";
import TimeCard from "../components/NewLibraryCards/timeCard.jsx";
import { useGlobalContext } from "../store/context/globalContext.jsx";
export default function LibPage() {
  const { isSidebarOpen } = useGlobalContext();
  return (
    <section className="w-screen h-screen flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth h-full mt-20 flex flex-col items-start gap-4">
        <section className="w-full h-2/3 flex flex-col mt-2 items-start justify-between bg-highlight_background p-4 rounded-xl  ">
          <div className="w-full flex flex-col gap-2">
            <p className="text-2xl font-bold ">Library</p>
            <div className="w-full flex  items-start gap-8 lg:gap-0 lg:justify-between overflow-x-scroll scrollbar-hide ">
              <TimeCard />
              <TimeCard />
              <TimeCard />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-2xl font-bold ">Saved</p>
            <div className="w-full flex  items-start gap-8 lg:gap-0 lg:justify-between overflow-x-scroll scrollbar-hide ">
              <TimeCard />
            </div>
          </div>
        </section>
        <section className="w-full h-1/3 flex flex-col items-center justify-center  rounded-xl px-4 bg-terinary">
          <div className="w-full flex flex-col gap-2">
            <p className="text-2xl font-bold ">Collections</p>
            <div className="w-full flex  items-start gap-8  overflow-x-scroll scrollbar-hide ">
              <CollectionCard />
              <CollectionCard />
              <CollectionCard />
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
