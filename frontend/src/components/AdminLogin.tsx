import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await adminLogin(email, password);
      navigate('/admin');
    } catch (error: any) {
      if (error.response?.data?.errors) setErrors(error.response.data.errors);
      else setErrors({ general: error.response?.data?.message || 'Admin login failed. Please try again.' });
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        {/* Left preview */}
        <div className="hidden md:flex relative bg-gradient-to-br from-[#0E1630] to-[#0B1220] p-10 items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(248,113,113,.35) 0, transparent 25%),'+
              'radial-gradient(circle at 80% 30%, rgba(251,146,60,.25) 0, transparent 30%),'+
              'radial-gradient(circle at 40% 80%, rgba(244,114,182,.25) 0, transparent 30%)'
          }} />
          <div className="relative z-10 w-full">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">Admin access</div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">Administrator Portal</h1>
            <p className="mt-2 text-slate-300/80">Secure access for survey management and analytics.</p>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-[#0E1630] p-8 md:p-10">
          <div className="mb-8 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">Welcome back</div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">Admin Login</h2>
            <p className="text-slate-400 text-sm">Sign in to access the admin panel</p>
          </div>

          {errors.general && (
            <div className="mb-6 rounded-lg border border-red-400/20 bg-red-500/10 text-red-300 px-4 py-3 text-sm">{errors.general}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Admin Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#0B1220] border outline-none transition focus:ring-2 text-slate-100 placeholder:text-slate-500 ${errors.email ? 'border-red-400/50 focus:ring-red-400/30' : 'border-white/10 focus:ring-blue-400/30'}`} placeholder="admin@example.com" />
              {errors.email && <p className="mt-2 text-xs text-red-300">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Admin Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#0B1220] border outline-none transition focus:ring-2 text-slate-100 placeholder:text-slate-500 ${errors.password ? 'border-red-400/50 focus:ring-red-400/30' : 'border-white/10 focus:ring-blue-400/30'}`} placeholder="Admin password" />
              {errors.password && <p className="mt-2 text-xs text-red-300">{errors.password}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 font-semibold shadow-lg shadow-red-900/20 transition">
              {isLoading ? (<><span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span> Signing in...</>) : (<>Admin Sign In</>)}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-400 text-center md:text-left">
            <p>Need a regular user account? <Link to="/login" className="text-red-300 hover:text-red-200">User login here</Link></p>
            <p className="mt-6"><Link to="/" className="text-slate-400 hover:text-slate-200">← Back to Home</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
