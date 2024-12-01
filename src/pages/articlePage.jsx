import Navbar from "../components/navbar/navbar";
import demoImg from "../assets/demoIMG.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleById } from "../store/redux/slices/articleSlice.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addCommentToArticle,
  saveArticle,
  isArticleSaved,
} from "../../Api/Api.js"; // Import the necessary API functions
import LoadingComponent from "../components/loadingComponent/loadingComponent.jsx";

export default function ArticlePage() {
  const { id } = useParams(); // Monthly article ID
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user");
  const { selectedArticle, isLoading, isError } = useSelector(
    (state) => state.article
  );

  const [newComment, setNewComment] = useState(""); // State for the new comment input
  const [comments, setComments] = useState([]); // State for comments
  const [isSaved, setIsSaved] = useState(false); // Renamed state to avoid conflict
  const [loadingArticle, setLoadingArticle] = useState(true); // State to handle article loading state

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

  // Fetch article by ID
  useEffect(() => {
    const fetchData = async () => {
      setLoadingArticle(true); // Set loading state when fetching a new article
      if (id) {
        await dispatch(fetchArticleById(id));
        setLoadingArticle(false); // Set loading state to false once data is fetched
      }
    };
    fetchData();
  }, [id, dispatch]);

  // Check if the article is saved by the user
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const result = await isArticleSaved(userId, id); // Check if the article is saved
        setIsSaved(result.message === "Article is saved.");
      } catch (error) {
        console.error("Error checking if article is saved:", error);
      }
    };

    if (userId && id) {
      checkIfSaved();
    }
  }, [userId, id]);

  // Load comments for the article
  useEffect(() => {
    if (selectedArticle && selectedArticle.comments) {
      setComments(selectedArticle.comments);
    }
  }, [selectedArticle]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Don't add empty comments

    try {
      const newCommentData = {
        userId: userId,
        text: newComment,
        createdAt: new Date().toISOString(),
        _id: new Date().getTime().toString(),
      };

      await addCommentToArticle(id, userId, newComment);

      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment(""); // Clear the input field after adding comment
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  // Handle Save Article
  const handleSaveArticle = async () => {
    try {
      await saveArticle(
        userId,
        id,
        selectedArticle?.title,
        selectedArticle?.category,
        selectedArticle?.month,
        selectedArticle?.year,
        selectedArticle?.isMonthlyEdition
      );
      setIsSaved(true); // Set to true after successful save
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  if (loadingArticle || isLoading) {
    return <LoadingComponent />; // Show loading text or a spinner while the article is being loaded
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 overflow-x-hidden">
      <Navbar />
      <div className="relative w-full flex flex-col items-center">
        {/* First section */}
        <section className="w-full bg-[#2c2c2c] min-h-48 flex items-center justify-center my-16">
          <div className="w-mainWidth h-full flex flex-col items-center md:items-start md:flex-row gap-4">
            <img
              src={demoImg}
              className="w-coverImage h-coverImage relative top-8 md:top-16 left-0"
              alt="img"
            />
            <div className="flex flex-col items-center h-72 md:items-start gap-4 text-white relative top-4 md:top-16 z-30 left-0">
              <p className="text-2xl font-bold text-center md:text-left">
                {`Coherence Applied: ${selectedArticle?.title}`}
              </p>
              <p className="text-sm">{`${
                months[selectedArticle?.month - 1]
              } 2024 Edition`}</p>
              <p
                className="text-sm md:text-base lg:text-lg"
                style={{ lineHeight: 1.2 }}
              >
                {selectedArticle?.content.introduction}
              </p>
              {/* Save Button */}
              <button
                onClick={handleSaveArticle}
                className={`px-8 py-2 rounded-lg text-lg font-bold mt-4 ${
                  isSaved ? "bg-green-500" : "bg-blue-500"
                } text-white hover:shadow-cta_button_shadow`}
                disabled={isSaved}
              >
                {isSaved ? "Saved" : "Save Article"}
              </button>
            </div>
          </div>
        </section>

        {/* Second section */}
        <section className="w-mainWidth flex flex-col items-start gap-8 mt-8">
          <p className="text-lg md:text-2xl font-bold text-important_text">
            {`Coherence Applied: ${selectedArticle?.category} Journal`}
          </p>
          <div className="flex flex-col items-start gap-8">
            <p>
              Lorem ipsum refers to placeholder text often used in publishing
              and graphic design to demonstrate the visual style of a document,
              webpage, or typeface. It is intended to serve as a sample, not to
              be read as meaningful sentences.
            </p>
            {/* More content */}
          </div>
        </section>

        {/* Comments Section */}
        <div className="w-mainWidth mt-12">
          <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
          <div className="mt-8 flex gap-4 items-center">
            <input
              type="text"
              className="p-4 w-full border rounded-md"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>

          {/* Comments Below */}
          <div className="space-y-4 mt-8">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">{comment.userId}</p>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
