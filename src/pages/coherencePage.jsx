import { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { ArrowRight, BarChart2, Cpu, Dna, Sun } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleById } from "../store/redux/slices/articleSlice.jsx";
import { useParams, useNavigate } from "react-router-dom";
import demoImg from "../assets/demoIMG.png";
import {
  addCommentToArticle,
  saveArticle,
  isArticleSaved,
} from "../../Api/Api.js"; // Ensure you import the addComment function
import LoadingComponent from "../components/loadingComponent/loadingComponent.jsx";

export default function CoherencePage() {
  const { id } = useParams(); // Monthly article ID
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user");
  const { selectedArticle, isLoading, isError } = useSelector(
    (state) => state.article
  );
  const [isSaved, setIsSaved] = useState(false); // Renamed state to avoid conflict

  const [features, setFeatures] = useState([]);
  const [newComment, setNewComment] = useState(""); // State for the new comment input
  const [comments, setComments] = useState([]); // State for comments

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

  // Fetch the monthly article by ID
  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log(selectedArticle);
  }, [selectedArticle]);

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
  // Update features when the article data is loaded
  useEffect(() => {
    if (selectedArticle && selectedArticle.subArticles) {
      // Ensure unique entries in subArticles
      const uniqueSubArticles = Array.from(
        new Map(
          selectedArticle.subArticles.map((item) => [item.articleId, item])
        ).values()
      );

      const subArticles = uniqueSubArticles.map((subArticle, index) => ({
        id: subArticle._id,
        articleId: subArticle.articleId,
        title: subArticle.title,
        description: subArticle.content.introduction,
        highlights: subArticle.content.valueProposition.split(". "),
        icon: getIcon(index),
        bgColor: getBackgroundColor(index),
        borderColor: getBorderColor(index),
        hoverColor: getHoverColor(index),
      }));

      setFeatures(subArticles);
    }

    // Load comments for the article
    if (selectedArticle && selectedArticle.comments) {
      setComments(selectedArticle.comments);
    }
  }, [selectedArticle]);

  // Helper functions for dynamic styling
  const getIcon = (index) => {
    const icons = [<Sun />, <Cpu />, <Dna />, <BarChart2 />];
    return icons[index % icons.length];
  };

  const getBackgroundColor = (index) => {
    const colors = [
      "bg-blue-50",
      "bg-purple-50",
      "bg-green-50",
      "bg-yellow-50",
    ];
    return colors[index % colors.length];
  };

  const getBorderColor = (index) => {
    const colors = [
      "border-blue-200",
      "border-purple-200",
      "border-green-200",
      "border-yellow-200",
    ];
    return colors[index % colors.length];
  };

  const getHoverColor = (index) => {
    const colors = [
      "hover:border-blue-300",
      "hover:border-purple-300",
      "hover:border-green-300",
      "hover:border-yellow-300",
    ];
    return colors[index % colors.length];
  };
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

  // Handle loading and error states
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) return <div>Error loading article data.</div>;

  // Handle empty sub-articles
  if (features.length === 0 && !isLoading) {
    return <div>No sub-articles available for this article.</div>;
  }

  // Handle comment submission
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Don't add empty comments

    try {
      // Prepare the new comment in the same format as the existing comments
      const newCommentData = {
        userId: userId, // assuming you have the userId available
        text: newComment,
        createdAt: new Date().toISOString(), // Current date and time
        _id: new Date().getTime().toString(), // Unique ID based on timestamp (or use your preferred method)
      };

      // Call the API to add the comment to the article
      await addCommentToArticle(id, userId, newComment);

      // If the API call is successful, add the new comment to the state
      setComments((prevComments) => [...prevComments, newCommentData]);

      // Clear the input field after the comment has been added
      setNewComment(""); // Clear input after the comment has been added
    } catch (error) {
      // If the API call fails, log the error
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-8">
      <Navbar />
      {/* Monthly Article Title and Value Proposition */}
      {selectedArticle && selectedArticle.content && (
        <div className="w-full text-center mt-16">
          <section className="w-full bg-[#2c2c2c] min-h-48 flex items-center justify-center">
            <div className="w-mainWidth h-full flex flex-col items-center md:items-start md:flex-row gap-4">
              <img
                src={demoImg}
                className="w-coverImage h-coverImage relative top-8 md:top-16 left-0"
              />
              <div className="flex flex-col items-center h-72 md:items-start gap-4 text-white relative top-4 md:top-16 z-30 left-0 ">
                <p className="text-2xl font-bold text-center">
                  Coherence Applied: General Edition
                </p>
                <p className="text-sm">{`${
                  months[selectedArticle?.month - 1] || ""
                } 2024 Edition`}</p>
                <p
                  className="text-sm md:text-base lg:text-lg"
                  style={{ lineHeight: 1.2 }}
                >
                  {selectedArticle?.introduction || "Loading introduction..."}
                </p>
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
          <h1 className="text-3xl font-bold mt-28">{selectedArticle.title}</h1>
          <p className="text-xl mt-4 text-gray-700">
            {selectedArticle.content.valueProposition}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            id={feature.articleId}
            className={`hover:cursor-pointer rounded-xl ${feature.bgColor} border-2 ${feature.borderColor} ${feature.hoverColor} transition-all duration-300 hover:shadow-lg p-6 group flex flex-col items-start gap-4`}
          >
            <div className="mb-4">{feature.icon}</div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
              {feature.title}
            </h4>
            <p>{feature.category}</p>
            <p className="text-gray-600 mb-4">{feature.description}</p>

            <ul className="space-y-2">
              {feature.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center text-sm ">
                  <ArrowRight className="w-4 h-4 mr-2 text-important_text" />
                  {highlight}
                </li>
              ))}
            </ul>

            <button
              className="px-4 py-2 rounded-lg bg-secondary text-lg text-white flex items-center gap-2 font-semibold hover:shadow-cta_button_shadow"
              onClick={() => {
                navigate(`/article/${feature.articleId}`);
              }}
            >
              Access <FaArrowRight style={{ width: "25px" }} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Comment Form First */}
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

        {/* Comments Section Below */}
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
    </section>
  );
}
