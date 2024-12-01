import PropTypes from "prop-types";
import articleImage from "../../assets/demoIMG.png"; // Import the article image
import ReactStars from "react-rating-stars-component"; // Import react-stars for rating
import { useNavigate } from "react-router-dom";

export default function StoreCard({
  id,
  title,
  category,
  month,
  year,
  averageRating,
  accessLevel,
  isMonthlyEdition,
}) {
  const navigate = useNavigate();
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

  const accessColors = {
    premium: "bg-gradient-to-r from-yellow-500 to-yellow-300 text-yellow-900",
    advanced: "bg-gradient-to-r from-gray-500 to-gray-300 text-gray-900",
    basic: "bg-gradient-to-r from-blue-500 to-blue-300 text-blue-900",
  };

  return (
    <div
      key={id}
      className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center hover:cursor-pointer 
        transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-card_shadow"
      onClick={() => {
        if (isMonthlyEdition) {
          navigate(`/coherenceapplied/${id}`); // Navigate to CoherenceAppliedPage
        } else {
          navigate(`/article/${id}`); // Navigate to ArticlePage
        }
      }}
    >
      <img
        src={articleImage}
        alt={title}
        className="w-coverImage h-coverImage object-cover rounded-md"
      />

      <h2
        className="text-2xl font-semibold mt-4 text-important_text text-center line-clamp-1 "
        title={title} // Tooltip to show full text on hover
      >
        {title}
      </h2>

      <p className="text-lg text-gray-600">{category}</p>
      <p className="text-sm text-gray-500">
        {months[month - 1]} {year}
      </p>

      <div className="flex items-center mt-2">
        <ReactStars
          count={5}
          value={averageRating}
          size={24}
          activeColor="#ffd700"
          isHalf={true}
          edit={false}
        />
        <span className="ml-2">{averageRating}</span>
      </div>

      <p
        className={`mt-4 py-2 px-4 rounded-md text-sm font-medium animate-gradient ${accessColors[accessLevel]}`}
      >
        {accessLevel.charAt(0).toUpperCase() + accessLevel.slice(1)} Access
      </p>
    </div>
  );
}

StoreCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  accessLevel: PropTypes.string.isRequired,
  isMonthlyEdition: PropTypes.bool.isRequired, // Added isMonthlyEdition prop validation
};
