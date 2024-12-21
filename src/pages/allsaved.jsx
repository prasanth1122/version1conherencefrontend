import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { useEffect, useState } from "react";
import { getAllCollectionsForUser } from "../../Api/Api.js";
import LibCard from "../components/libraryCard/libCard.jsx";

export default function AllSaved() {
  const user = localStorage.getItem("user"); // Retrieve user ID from localStorage
  const { isSidebarOpen } = useGlobalContext(); // Global context for managing sidebar visibility
  const [collections, setCollections] = useState([]); // State to store collections fetched from the API
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const [error, setError] = useState(null); // State to handle error messages

  // Fetch collections for the logged-in user
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true); // Show loading indicator
        const data = await getAllCollectionsForUser(user); // API call to fetch user's collections
        setCollections(data.collections || []); // Update collections state, defaulting to an empty array if null
      } catch (err) {
        console.error("Error fetching collection:", err); // Log error for debugging
        setError("Failed to load collection data."); // Set user-friendly error message
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchCollection();
  }, [user]); // Dependency on user ID to re-run the effect when it changes

  // Show loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-gray-500">Loading...</p>
      </div>
    );
  }

  // Show error message if data fetch fails
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-red-500">{error}</p>
      </div>
    );
  }

  // Flatten articles from all collections into a single array
  const allArticles = collections.flatMap((collection) =>
    collection.articles.map((article) => ({
      ...article, // Include all article properties
      collectionName: collection.name, // Track the name of the parent collection
    }))
  );

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="w-mainWidth mt-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-important_text">
          All Saved Articles
        </h1>

        {/* Display articles if available */}
        {allArticles.length > 0 ? (
          <div className="w-full flex flex-wrap gap-4 mt-6">
            {allArticles.map((article) => (
              <LibCard
                key={article._id} // Unique key for each article
                id={article._id} // Article ID for navigation
                title={article.title} // Article title
                category={article.category} // Article category
                month={article.month} // Publication month
                year={article.year} // Publication year
              />
            ))}
          </div>
        ) : (
          // Show message if no articles are found
          <p className="text-lg text-gray-600 mt-6">
            No saved articles found in your collections.
          </p>
        )}
      </main>
    </section>
  );
}
