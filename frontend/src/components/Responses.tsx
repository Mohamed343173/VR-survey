import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Answer {
  id: number;
  question: {
    id: number;
    question_number: number;
    question_text: string;
    type: string;
  };
  answer_text: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Responses: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [responses, setResponses] = useState<{ user: User; answers: Answer[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      fetchResponses();
    }
  }, [token]);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/responses/${token}`);
      setResponses(response.data);
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

  if (!responses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            No responses found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Survey Responses</h1>
          <p className="mt-2 text-gray-600">
            Responses for {responses.user.name} ({responses.user.email})
          </p>
        </div>

        <div className="space-y-6">
          {responses.answers.map((answer) => (
            <div key={answer.id} className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Question {answer.question.question_number}/20
                </h3>
                <p className="text-gray-700 mt-2">{answer.question.question_text}</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-md bg-gray-50">
                <p className="text-gray-900 font-medium">Answer:</p>
                <p className="text-gray-700 mt-1">{answer.answer_text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Thank you for completing the survey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Responses;
