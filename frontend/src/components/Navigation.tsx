import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between">
        <div className="text-xl font-bold">Survey App</div>
        <div className="flex space-x-6">
          <Link to="/survey" className="hover:text-indigo-200 transition-colors">
            Take Survey
          </Link>
          <Link to="/register" className="hover:text-indigo-200 transition-colors">
            Register
          </Link>
          <Link to="/login" className="hover:text-indigo-200 transition-colors">
            Login
          </Link>
          <Link to="/admin/login" className="hover:text-indigo-200 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
