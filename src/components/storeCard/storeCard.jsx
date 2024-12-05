import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Import the eye icon for views
import demoImg from "../../assets/demoIMG.png";
export default function StoreCard({ id, title, category, month, year, views }) {
  const handleCardClick = () => {
    // Convert category to lowercase and remove spaces
    const formattedCategory = category.toLowerCase().replace(/\s+/g, "");

    // Navigate to the dynamic route with the formatted category and ID
    navigate(`/${formattedCategory}/${id}`);
  };

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

  return (
    <div
      className="bg-highlight_background py-4 rounded-lg shadow-lg flex flex-col items-center hover:cursor-pointer hover:bg-terinary 
        transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-card_shadow"
      onClick={handleCardClick} // Navigate to the PeriodicalPage
    >
      <img
        src={demoImg} // Placeholder for image
        alt={title}
        className="w-coverImage rounded-xl h-coverImage object-cover "
      />

      <h2
        className="text-2xl font-semibold mt-4 text-important_text text-center line-clamp-1"
        title={title}
      >
        {title}
      </h2>

      <p className="text-lg text-gray-600">{category}</p>
      <p className="text-sm text-gray-500">
        {months[month - 1]} {year}
      </p>

      <div className="flex items-center mt-2">
        <FaEye className="text-gray-600" />
        <span className="ml-2">{views} views</span>
      </div>
    </div>
  );
}

StoreCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  introduction: PropTypes.string.isRequired,
  valueProposition: PropTypes.string.isRequired,
};
