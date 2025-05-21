import React from "react";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">
              MeetFlow
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={onLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;