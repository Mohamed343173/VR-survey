import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Question {
  id: number;
  question_number: number;
  question_text: string;
  type: 'A' | 'B' | 'C';
}

const Survey: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/survey');
      setQuestions(response.data.questions);
      setAnswers(new Array(response.data.questions.length).fill(''));
    } catch (error) {
      setError('Failed to load survey questions');
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/api/survey', {
        email,
        answers,
      });

      setSuccess('Survey completed successfully!');
      setTimeout(() => {
        navigate(`/responses/${response.data.token}`);
      }, 2000);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        setError(errorMessages.join(', '));
      } else {
        setError(err.response?.data?.message || 'Failed to submit survey');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderQuestionInput = (question: Question, index: number) => {
    switch (question.type) {
      case 'A':
        return (
          <div className="space-y-2">
            {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="mr-2"
                  required
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'B':
        return (
          <input
            type="text"
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={255}
            required
          />
        );
      case 'C':
        return (
          <input
            type="number"
            min="1"
            max="5"
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        );
      default:
        return null;
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading survey questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                ← Back to Home
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Survey Questionnaire</h1>
            <p className="mt-2 text-gray-600">Please answer all 20 questions below</p>
          </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (for Q1)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Question {question.question_number}/20
                </h3>
                <p className="text-gray-700 mt-2">{question.question_text}</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
                {renderQuestionInput(question, index)}
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Finalize Survey'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Survey;
