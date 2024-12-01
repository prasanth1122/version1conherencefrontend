import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedArticles } from "../store/redux/slices/librarySlice.jsx";
import LibraryCard from "../components/libraryCard/libraryCard";
import Navbar from "../components/navbar/navbar";
import LoadingComponent from "../components/loadingComponent/loadingComponent.jsx";

export default function LibraryPage() {
  const dispatch = useDispatch();
  const { savedArticles, loading, error } = useSelector(
    (state) => state.library
  );

  // State to hold search input and userId
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(null);

  // Retrieve userId on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    setUserId(storedUserId); // Store userId in state
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSavedArticles(userId));
    }
  }, [userId, dispatch]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase().replace(/\s+/g, ""));
  };

  // Ensure savedArticles is an array before calling filter
  const filteredArticles = Array.isArray(savedArticles)
    ? savedArticles.filter((article) => {
        const normalizedTitle = article.title
          ?.toLowerCase()
          .replace(/\s+/g, "");
        const normalizedCategory = article.category
          ?.toLowerCase()
          .replace(/\s+/g, "");
        const normalizedMonth = article.month.toString(); // Convert month to string
        const normalizedYear = article.year.toString(); // Convert year to string

        return (
          normalizedTitle.includes(searchQuery) ||
          normalizedCategory.includes(searchQuery) ||
          normalizedMonth.includes(searchQuery) ||
          normalizedYear.includes(searchQuery)
        );
      })
    : []; // Return empty array if savedArticles is not an array

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error loading article data.</div>;
  if (!userId) return <div>User not found. Please log in.</div>;

  return (
    <section className="w-full h-full flex flex-col items-center gap-8">
      <Navbar />
      <main className="w-mainWidth mt-24">
        <p className="w-full text-center lg:text-left text-4xl font-bold">
          Library
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by title, category, month, or year"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M15 11a4 4 0 10-8 0 4 4 0 008 0z"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Display Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <LibraryCard
                key={article._id}
                id={article.articleId}
                title={article.title || "Untitled"}
                category={article.category || "Uncategorized"}
                month={article.month}
                year={article.year}
                isMonthlyEdition={article.isMonthlyEdition}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No articles found matching your search.
            </p>
          )}
        </div>
      </main>
    </section>
  );
}
