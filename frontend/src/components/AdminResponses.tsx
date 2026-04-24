import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Answer {
  question_number: number;
  question_text: string;
  answer_text: string;
}

interface Response {
  user_id: number;
  user_name: string;
  user_email: string;
  answers: Answer[];
}

const AdminResponses: React.FC = () => {
  const { logout } = useAuth();
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/responses');
      setResponses(response.data.responses);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to load responses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading responses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-indigo-800">
        <div className="flex items-center justify-center h-16 bg-indigo-900">
          <h1 className="text-white text-xl font-bold">Survey Admin</h1>
        </div>
        <nav className="mt-8">
          <Link
            to="/admin"
            className="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 hover:text-white"
          >
            <span>Home</span>
          </Link>
          <Link
            to="/admin/questionnaire"
            className="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 hover:text-white"
          >
            <span>Questionnaire</span>
          </Link>
          <Link
            to="/admin/responses"
            className="flex items-center px-6 py-3 text-white bg-indigo-700 border-l-4 border-indigo-300"
          >
            <span>Responses</span>
          </Link>
          <button
            onClick={logout}
            className="w-full text-left flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 hover:text-white"
          >
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Responses</h2>
              <p className="text-gray-600">All user responses grouped by respondent</p>
            </div>
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {responses.map((response) => (
            <div key={response.user_id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Respondent: {response.user_name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Email: {response.user_email}
                </p>
              </div>
              
              <div className="border-t border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Question #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Question Text
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Answer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {response.answers.map((answer, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {answer.question_number}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {answer.question_text}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="border-2 border-dashed border-gray-300 p-2 rounded-md bg-gray-50">
                              {answer.answer_text}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {responses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No responses found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResponses;
