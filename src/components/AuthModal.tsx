import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, LogOut, Shield, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { navigate } from '../utils/router';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin, isLoggedIn, login, signup, logout } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign In fields
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  // Sign Up fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const resetFields = () => {
    setSigninEmail('');
    setSigninPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirm('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    setSuccess('');

    if (!signinEmail || !signinPassword) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await login(signinEmail.trim(), signinPassword);
    setIsLoading(false);
    
    if (result.success) {
      setSuccess('Welcome back!');
      resetFields();
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    setSuccess('');

    if (!signupName || !signupEmail || !signupPassword || !signupConfirm) {
      setError('Please fill in all fields');
      return;
    }

    if (signupPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const result = await signup(signupName.trim(), signupEmail.trim(), signupPassword);
    setIsLoading(false);

    if (result.success) {
      setSuccess('Account created successfully!');
      resetFields();
    } else {
      setError(result.error || 'Signup failed');
    }
  };

  const handleLogout = () => {
    logout();
    resetFields();
  };

  const handleSwitchTab = (newTab: 'signin' | 'signup') => {
    setTab(newTab);
    setError('');
    setSuccess('');
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Main Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#0c101a] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-black/40">
          <div className="flex items-center gap-2">
            <User className="text-[#EAEF30] w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
              {isLoggedIn ? 'Your Account' : 'Welcome to DropKit'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          {isLoggedIn && user ? (
            /* ===== LOGGED IN VIEW ===== */
            <div className="space-y-6 py-4">
              {/* User Avatar + Info */}
              <div className="flex flex-col items-center gap-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black uppercase ${isAdmin ? 'bg-[#EAEF30] text-black' : 'bg-white/10 text-white border border-white/10'}`}>
                  {getInitials(user.name)}
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-sans font-bold text-lg text-white">{user.name}</h3>
                  <p className="font-mono text-[10px] text-neutral-400">{user.email}</p>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EAEF30]/10 border border-[#EAEF30]/20 rounded-full mt-2">
                      <Shield size={10} className="text-[#EAEF30]" />
                      <span className="font-mono text-[9px] font-bold text-[#EAEF30] uppercase tracking-wider">Admin</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {isAdmin && (
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/admin');
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 hover:border-[#EAEF30]/30 hover:bg-white/8 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <Shield size={16} className="text-[#EAEF30]" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">Admin Console</p>
                        <p className="text-[9px] font-mono text-neutral-400">Manage products & catalog</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-neutral-500 group-hover:text-[#EAEF30] transition-colors" />
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/5 border border-red-500/10 hover:bg-red-500/15 hover:border-red-500/30 rounded-xl transition-all cursor-pointer text-red-400 hover:text-red-300"
                >
                  <LogOut size={14} />
                  <span className="text-xs font-bold uppercase tracking-wider">Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* ===== LOGIN / SIGNUP VIEW ===== */
            <div className="space-y-6">
              {/* Tab Switcher */}
              <div className="flex border border-white/10 rounded-xl overflow-hidden bg-white/5">
                <button
                  onClick={() => handleSwitchTab('signin')}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    tab === 'signin'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleSwitchTab('signup')}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    tab === 'signup'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error / Success Messages */}
              {error && (
                <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 font-mono text-[10px] uppercase tracking-wider">{error}</p>
                </div>
              )}
              {success && (
                <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 font-mono text-[10px] uppercase tracking-wider">{success}</p>
                </div>
              )}

              {tab === 'signin' ? (
                /* SIGN IN FORM */
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="text-center space-y-1 pb-2">
                    <h3 className="font-display uppercase text-lg text-white">Welcome Back</h3>
                    <p className="text-[10px] text-neutral-400 font-mono">SIGN IN TO YOUR DROPKIT ACCOUNT</p>
                  </div>

                  <div className="space-y-3">
                    {/* Email */}
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={signinEmail}
                        onChange={(e) => setSigninEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full bg-black/60 border border-white/10 pl-9 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30 rounded-lg transition-colors"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signinPassword}
                        onChange={(e) => setSigninPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-black/60 border border-white/10 pl-9 pr-10 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30 rounded-lg transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white cursor-pointer transition-colors"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center h-10 bg-[#EAEF30] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-70 transition-all cursor-pointer rounded-lg font-sans"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Sign In'}
                  </button>

                  <p className="text-center text-[10px] text-neutral-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchTab('signup')}
                      className="text-[#EAEF30] font-bold hover:underline cursor-pointer"
                    >
                      Create one
                    </button>
                  </p>
                </form>
              ) : (
                /* SIGN UP FORM */
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="text-center space-y-1 pb-2">
                    <h3 className="font-display uppercase text-lg text-white">Join DropKit</h3>
                    <p className="text-[10px] text-neutral-400 font-mono">CREATE YOUR ACCOUNT</p>
                  </div>

                  <div className="space-y-3">
                    {/* Name */}
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Full name"
                        className="w-full bg-black/60 border border-white/10 pl-9 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30 rounded-lg transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full bg-black/60 border border-white/10 pl-9 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30 rounded-lg transition-colors"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Password (min 4 characters)"
                        className="w-full bg-black/60 border border-white/10 pl-9 pr-10 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30 rounded-lg transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white cursor-pointer transition-colors"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signupConfirm}
                        onChange={(e) => setSignupConfirm(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full bg-black/60 border border-white/10 pl-9 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/30 rounded-lg transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center h-10 bg-[#EAEF30] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-70 transition-all cursor-pointer rounded-lg font-sans"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Create Account'}
                  </button>

                  <p className="text-center text-[10px] text-neutral-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchTab('signin')}
                      className="text-[#EAEF30] font-bold hover:underline cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
