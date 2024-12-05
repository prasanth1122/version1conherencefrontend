import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeriodicals } from "../store/redux/slices/periodicalSlice.jsx"; // Import the Redux slice
import Navbar from "../components/navbar/navbar.jsx";
import StoreCard from "../components/storeCard/storeCard.jsx";
import LoadingComponent from "../components/loadingComponent/loadingComponent.jsx";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { periodicals, loading } = useSelector((state) => state.periodicals); // Access periodicals from Redux

  const { isSidebarOpen } = useGlobalContext();

  useEffect(() => {
    dispatch(fetchPeriodicals());
  }, [dispatch]);

  // Log the periodicals data after dispatch
  useEffect(() => {
    console.log("Fetched Periodicals:", periodicals);
  }, [periodicals]); // Log whenever periodicals change

  if (loading) return <LoadingComponent />;

  // Access periodicals from the 'data' key in the fetched result
  const periodicalsData = periodicals?.data || [];

  // Filter periodicals based on the search term
  const filteredPeriodicals = periodicalsData.filter((periodical) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      periodical.title.toLowerCase().includes(searchLower) ||
      periodical.category.toLowerCase().includes(searchLower) ||
      periodical.month.toString().includes(searchLower) ||
      periodical.year.toString().includes(searchLower)
    );
  });

  return (
    <section className="w-full h-full flex flex-col items-center  overflow-y-auto scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth flex flex-col items-center mt-20 py-8">
        <div className="w-full flex items-center justify-center gap-4 ">
          <div className="relative w-3/4">
            <input
              type="text"
              placeholder="Search by title, category, month, or year..."
              className="p-2 w-full border border-gray-300 rounded pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {/* Map through filteredPeriodicals instead of periodicals */}
          {filteredPeriodicals.length > 0 ? (
            filteredPeriodicals.map((periodical) => (
              <StoreCard
                key={periodical._id}
                id={periodical._id}
                title={periodical.title}
                category={periodical.category}
                month={periodical.month}
                year={periodical.year}
                views={periodical.views}
              />
            ))
          ) : (
            <p>No periodicals found</p> // Show message if no periodicals match the search
          )}
          {filteredPeriodicals.length > 0 ? (
            filteredPeriodicals.map((periodical) => (
              <StoreCard
                key={periodical._id}
                id={periodical._id}
                title={periodical.title}
                category={periodical.category}
                month={periodical.month}
                year={periodical.year}
                views={periodical.views}
              />
            ))
          ) : (
            <p>No periodicals found</p> // Show message if no periodicals match the search
          )}
          {filteredPeriodicals.length > 0 ? (
            filteredPeriodicals.map((periodical) => (
              <StoreCard
                key={periodical._id}
                id={periodical._id}
                title={periodical.title}
                category={periodical.category}
                month={periodical.month}
                year={periodical.year}
                views={periodical.views}
              />
            ))
          ) : (
            <p>No periodicals found</p> // Show message if no periodicals match the search
          )}
        </div>
      </main>
    </section>
  );
}
