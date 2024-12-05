import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { useState } from "react";

export default function ProfilePage() {
  const { isSidebarOpen } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev); // Toggle the isEditing state
  };

  const handleSubmit = () => {
    setIsEditing(false);
    // Add logic to handle form submission (e.g., API call)
    console.log("Form submitted");
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {/* Sidebar included here */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />

      {/* Main Content */}
      <main className="w-mainWidth bg-highlight_background rounded-xl p-6 items-start mt-20 flex flex-col gap-4">
        <div className="w-full flex items-center justify-between mb-4 mt-2">
          <p className="text-4xl font-bold">Profile</p>
          <button
            className="px-4 py-2 text-lg text-white font-semibold rounded-lg bg-secondary flex items-center gap-2"
            onClick={handleEditToggle}
          >
            {isEditing && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {isEditing ? "Cancel" : "Edit"}{" "}
            {/* Button text changes based on isEditing */}
          </button>
        </div>

        <section className="w-full flex flex-col items-start gap-6">
          <div className="w-full flex flex-col items-start gap-2">
            <p className="w-full text-lg font-bold">Name</p>
            <input
              className="w-full px-4 py-2 bg-white border rounded-md outline-none focus:ring-2 focus:ring-primary"
              type="text"
              id="text"
              value="John Doe"
              disabled={!isEditing}
              placeholder="Enter your Name"
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <p className="w-full text-lg font-bold">Email</p>
            <input
              className="w-full px-4 py-2  bg-white border rounded-md outline-none focus:ring-2 focus:ring-primary"
              type="email"
              id="email"
              value="admin@gmail.com"
              disabled={!isEditing}
              placeholder="Enter your Email"
            />
          </div>
          <div className="w-full flex items-center gap-6 my-8">
            <p className="text-lg font-bold">User:</p>
            <p className="text-lg">Student</p>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <p className="w-full text-lg font-bold">Institution</p>
            <input
              className="w-full px-4 py-2  bg-white border rounded-md outline-none focus:ring-2 focus:ring-primary"
              type="text"
              id="university"
              value="XYZ University"
              disabled={!isEditing}
              placeholder="Enter Institution Name"
            />
          </div>
        </section>

        {/* Submit Button */}
        {isEditing && (
          <button
            className="px-6 py-2 mt-6 text-lg text-white font-semibold rounded-lg bg-primary self-end"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </main>
    </section>
  );
}
