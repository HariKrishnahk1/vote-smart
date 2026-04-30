import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, IdCard, LogIn, UserPlus, Fingerprint } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    voterId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin 
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          if (onLogin) onLogin();
        } else {
          // Switch to login after successful registration
          setIsLogin(true);
          setErrorMsg('Registration successful. Please log in.');
          setFormData({ ...formData, password: '' });
        }
      } else {
        setErrorMsg(data.error || 'Authentication failed');
      }
    } catch (err) {
      setErrorMsg('Cannot connect to server. Is it running?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono">
      {/* Neon Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-pink/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-slate-900/80 backdrop-blur-xl border border-neon-cyan/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.15)] relative overflow-hidden">
          
          {/* Top Neon Accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-cyan shadow-[0_0_10px_#0ff]" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-950 border border-neon-cyan/50 shadow-[0_0_15px_rgba(0,255,255,0.3)] mb-4">
              <Fingerprint className="w-8 h-8 text-neon-cyan" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider mb-2 leading-tight">
              <span className="whitespace-nowrap">Welcome to SmartVote AI</span>
              <br />
              <span className="text-xl sm:text-2xl text-neon-cyan/90 mt-2 block">
                {isLogin ? 'Please Login' : 'Please Register'}
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-3">
              {isLogin ? 'Authenticate to access voting terminal' : 'Verify Voter ID to establish new credentials'}
            </p>
          </div>

          {errorMsg && (
            <div className={`mb-6 p-3 rounded border text-sm font-bold text-center ${
              errorMsg.includes('successful') 
                ? 'bg-neon-green/10 border-neon-green text-neon-green' 
                : 'bg-neon-pink/10 border-neon-pink text-neon-pink'
            }`}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-neon-cyan/80 text-xs tracking-widest mb-1 uppercase">Voter ID Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neon-cyan/50 group-focus-within:text-neon-cyan transition-colors">
                    <IdCard size={18} />
                  </div>
                  <input
                    type="text"
                    name="voterId"
                    value={formData.voterId}
                    onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-neon-cyan/30 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan shadow-[inset_0_0_10px_rgba(0,255,255,0.05)] transition-all placeholder:text-slate-600 uppercase"
                    placeholder="E.g. ABC1234567"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-neon-cyan/80 text-xs tracking-widest mb-1 uppercase">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neon-cyan/50 group-focus-within:text-neon-cyan transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-neon-cyan/30 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan shadow-[inset_0_0_10px_rgba(0,255,255,0.05)] transition-all placeholder:text-slate-600"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-neon-cyan/80 text-xs tracking-widest mb-1 uppercase">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neon-cyan/50 group-focus-within:text-neon-cyan transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-neon-cyan/30 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan shadow-[inset_0_0_10px_rgba(0,255,255,0.05)] transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-slate-950 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider group"
            >
              {isLogin ? (
                <>
                  <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                  Initialize Auth
                </>
              ) : (
                <>
                  <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
                  Establish Link
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 hover:text-neon-pink transition-colors text-sm flex items-center justify-center gap-2 mx-auto uppercase tracking-wider"
            >
              {isLogin ? "No identity found? Register Node" : "Return to Login Sequence"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
