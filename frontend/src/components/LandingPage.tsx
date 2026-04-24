import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to the Survey Application
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Take our comprehensive survey or manage responses as an administrator
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Take the Survey</h2>
              <p className="text-gray-600 mb-6">
                Complete our 20-question survey to provide valuable feedback
              </p>
              <Link
                to="/survey"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Start Survey
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Account</h2>
              <p className="text-gray-600 mb-6">
                Create an account or login to save your progress
              </p>
              <div className="space-y-3">
                <Link
                  to="/register"
                  className="block w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Administrator Access</h2>
            <p className="text-gray-600 mb-6">
              Access the admin panel to view survey statistics and manage responses
            </p>
            <Link
              to="/admin/login"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
