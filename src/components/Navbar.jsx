import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Vote } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Guide', path: '/guide' },
    { name: 'Chatbot', path: '/chatbot' },
    { name: 'Quiz', path: '/quiz' }
  ];

  const [language, setLanguage] = useState('English');

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'English' ? 'Hindi' : 'English');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                <Vote size={24} />
              </div>
              <span className="font-bold text-xl text-slate-800">VoteSmart AI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === link.path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1.5 border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {language}
            </button>
            <button
              onClick={onLogout}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50"
            >
              Switch to {language === 'English' ? 'Hindi' : 'English'}
            </button>
            <button
              onClick={() => {
                if(onLogout) onLogout();
                setIsOpen(false);
              }}
              className="block w-full text-center mt-4 bg-slate-900 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
