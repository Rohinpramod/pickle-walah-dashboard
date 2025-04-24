import React from 'react';
import logo from '/logo.png'; // Adjust the path as necessary

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      {/* Food Delivery Image */}
      <img
        src={logo}
        alt="Food Delivery"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mb-8 rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
      />

      {/* Welcome Text */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-red-500 leading-snug tracking-tight">
        Welcome to the dashboard of <br />
        <span className="text-yellow-300 drop-shadow-sm">Pickle Walah</span>
      </h1>

      {/* Optional: Subtitle */}
      <p className="mt-4 text-center text-gray-600 max-w-md text-base sm:text-lg">
        Manage your delicious pickle orders and stay on top of your deliveries with ease.
      </p>
    </div>
  );
};

export default Home;
