import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.response?.data?.message || 'Login failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-4 py-10">
      {/* Card */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        {/* Left: Brand/Preview */}
        <div className="hidden md:flex relative bg-gradient-to-br from-[#0E1630] to-[#0B1220] p-10 items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(56,189,248,.35) 0, transparent 25%),\
               radial-gradient(circle at 80% 30%, rgba(168,85,247,.25) 0, transparent 30%),\
               radial-gradient(circle at 40% 80%, rgba(99,102,241,.25) 0, transparent 30%)'
          }} />
          <div className="relative z-10 w-full">
            <div className="mb-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                Secure Portal
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="mt-2 text-slate-300/80">
                Manage surveys, analyze data, and monitor participants with a unified control panel.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs text-slate-400">Total Surveys</div>
                  <div className="mt-1 text-2xl font-semibold">20</div>
                  <div className="text-[10px] text-slate-500">+3 this month</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs text-slate-400">Active Participants</div>
                  <div className="mt-1 text-2xl font-semibold">428</div>
                  <div className="text-[10px] text-slate-500">+12% this week</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs text-slate-400">Avg Completion</div>
                  <div className="mt-1 text-2xl font-semibold">62%</div>
                  <div className="text-[10px] text-emerald-400">+5% improvement</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs text-slate-400">Data Points</div>
                  <div className="mt-1 text-2xl font-semibold">0.4K</div>
                  <div className="text-[10px] text-slate-500">+428 total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-[#0E1630] p-8 md:p-10">
          {/* Logo/Title */}
          <div className="mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              Welcome back
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="text-slate-400 text-sm">Use your email and password to continue</p>
          </div>

          {/* Error */}
          {errors.general && (
            <div className="mb-6 rounded-lg border border-red-400/20 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm text-slate-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#0B1220] border outline-none transition focus:ring-2 text-slate-100 placeholder:text-slate-500 ${
                  errors.email ? 'border-red-400/50 focus:ring-red-400/30' : 'border-white/10 focus:ring-blue-400/30'
                }`}
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-300">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-slate-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#0B1220] border outline-none transition focus:ring-2 text-slate-100 placeholder:text-slate-500 ${
                  errors.password ? 'border-red-400/50 focus:ring-red-400/30' : 'border-white/10 focus:ring-blue-400/30'
                }`}
                placeholder="Your password"
              />
              {errors.password && (
                <p className="mt-2 text-xs text-red-300">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 font-semibold shadow-lg shadow-blue-900/20 transition"
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
                  Signing in...
                </>
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-sm text-slate-400">
            <p>
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-400 hover:text-blue-300">
                Create one
              </Link>
            </p>
            <p className="mt-2">
              Are you an admin?{' '}
              <Link to="/admin/login" className="text-blue-400 hover:text-blue-300">
                Go to admin login
              </Link>
            </p>
            <p className="mt-6">
              <Link to="/" className="text-slate-400 hover:text-slate-200">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
