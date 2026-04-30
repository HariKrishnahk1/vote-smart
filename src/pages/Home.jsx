import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, BookOpen, MessageSquare, Target } from 'lucide-react';

const EligibilityChecker = () => {
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('India');
  const [result, setResult] = useState(null);

  const checkEligibility = (e) => {
    e.preventDefault();
    if (!age) return;
    
    if (parseInt(age) >= 18) {
      setResult({ eligible: true, message: "You are eligible to vote! Make sure you are registered." });
    } else {
      setResult({ eligible: false, message: `Not eligible yet. You need to be 18 to vote. You can vote in ${18 - parseInt(age)} years!` });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-slate-800">Eligibility Checker</h3>
      <form onSubmit={checkEligibility} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Your Age</label>
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Enter your age"
            min="1"
            max="120"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <select 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Other</option>
          </select>
        </div>
        <button 
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Check Eligibility
        </button>
      </form>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${result.eligible ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-orange-50 text-orange-800 border border-orange-100'}`}
        >
          {result.eligible ? <CheckCircle className="text-green-600 shrink-0" /> : <XCircle className="text-orange-600 shrink-0" />}
          <p className="text-sm font-medium">{result.message}</p>
        </motion.div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Learn How Elections Work – <span className="text-primary-600">The Smart Way</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Your interactive guide to understanding democracy. Discover the process, check your eligibility, and chat with our AI to get all your questions answered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/guide" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
                  <BookOpen size={20} />
                  Start the Guide
                </Link>
                <Link to="/chatbot" className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition-colors flex items-center gap-2">
                  <MessageSquare size={20} />
                  Ask AI Assistant
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <EligibilityChecker />
            </motion.div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to know</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Master the democratic process with our interactive tools designed specifically for first-time voters.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/guide" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Step-by-Step Guide</h3>
              <p className="text-slate-600 mb-4">Follow the complete journey from voter registration to election results with our interactive timeline.</p>
              <span className="text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore guide <ArrowRight size={16} />
              </span>
            </Link>
            
            <Link to="/chatbot" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Chat Assistant</h3>
              <p className="text-slate-600 mb-4">Got questions? Our intelligent AI is available 24/7 to provide simple, beginner-friendly answers.</p>
              <span className="text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Ask a question <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/quiz" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Election Quiz</h3>
              <p className="text-slate-600 mb-4">Test your knowledge with our gamified quiz and see how well you understand the democratic process.</p>
              <span className="text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Take the quiz <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
