import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@academi.edu.bd');
  const [password, setPassword] = useState('Admin@123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Welcome back to Academi Solution!');
      if (onLoginSuccess) onLoginSuccess();
      navigate('/academic/students');
    }, 800);
  };

  const handleDemoLogin = () => {
    setEmail('admin@academi.edu.bd');
    setPassword('Admin@123456');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Logged in as Academic Manager Demo');
      if (onLoginSuccess) onLoginSuccess();
      navigate('/academic/students');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#10223a] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center mx-auto shadow-xl shadow-blue-600/30 border border-blue-400/30">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Academi Solution</h1>
          <p className="text-xs text-blue-200/80 font-medium">School Management System • Creatrix Soft Tech Ltd</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1e3a5f]/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">Sign In to Your Account</h2>
            <p className="text-xs text-slate-400">Enter your credentials to access the academic dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email / Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Email Address / Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@academi.edu.bd"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#162a45] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); toast.info('Contact system administrator to reset password.'); }} className="text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#162a45] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded bg-[#162a45] border-slate-700 focus:ring-0"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Academi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="pt-4 border-t border-slate-700/60 text-center space-y-2">
            <p className="text-[11px] text-slate-400">Quick Testing Action:</p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 bg-slate-800/80 hover:bg-slate-800 text-blue-300 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>One-Click Admin Demo Login</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-500">
          &copy; 2025 Creatrix Soft Tech Ltd • All rights reserved
        </p>
      </div>
    </div>
  );
};
