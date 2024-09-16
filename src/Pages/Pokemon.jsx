import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const Pokemon = () => {
  // State to control visibility of "Back to Top" button
  const [showButton, setShowButton] = useState(false);

  // useEffect hook to handle scroll events and show the button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled more than 200px down, hide it otherwise
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top of the page when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Smooth scroll transition
    });
  };

  return (
    <div className="flex items-center flex-col gap-10 mt-10">
      {/* Header Section */}
      <header>
        <h1 className="ewert-regular text-white text-2xl sm:text-3xl md:text-5xl select-none">
          Let&apos;s Catch Pokemon
        </h1>
      </header>

      {/* Card Component */}
      <Card />

      {/* Back to Top Button - appears when scrolled down */}
      {showButton && (
        <button
          onClick={scrollToTop} // Trigger scroll to top when clicked
          className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
};

export default Pokemon;
