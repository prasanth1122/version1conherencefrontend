import { useEffect, useState } from "react";
import { getAllArticles } from "../../Api/Api.js"; // Import the function to fetch articles
import Navbar from "../components/navbar/navbar.jsx";
import StoreCard from "../components/storeCard/storeCard.jsx";
import LoadingComponent from "../components/loadingComponent/loadingComponent.jsx";

export default function StorePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Number of articles per page

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getAllArticles();
        console.log("Fetched articles:", fetchedArticles);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter articles by search term and dropdown filter
  const filteredArticles = articles.filter((article) => {
    const matchSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      months[article.month - 1]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      article.year.toString().includes(searchTerm);

    const matchFilter =
      filter === "all" ||
      (filter === "thisMonth" && article.month - 1 === new Date().getMonth()) ||
      (filter === "thisYear" && article.year === new Date().getFullYear()) ||
      (filter === "2024" && article.year === 2024);

    return matchSearch && matchFilter;
  });

  // Calculate pagination details
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <LoadingComponent />;

  return (
    <section className="w-full h-full flex flex-col items-center gap-8">
      <Navbar />
      <main className="w-mainWidth flex flex-col items-center mt-20">
        <h1 className="text-4xl font-bold">Store Page</h1>

        <div className="w-full flex items-center justify-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Search by title, author, month, or year..."
            className="p-2 w-3/4 lg:w-1/2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-2 border border-gray-300 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {currentArticles.map((article) => (
            <StoreCard
              key={article._id}
              id={article._id}
              title={article.title}
              category={article.category}
              month={article.month}
              year={article.year}
              accessLevel={article.accessLevel}
              averageRating={article.averageRating}
              isMonthlyEdition={article.isMonthlyEdition}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2 mb-4 ">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                page === currentPage
                  ? "border-2 border-secondary"
                  : "border-2 border-black"
              }  ${
                page === currentPage
                  ? "bg-secondary text-white"
                  : "bg-white text-black"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </main>
    </section>
  );
}
