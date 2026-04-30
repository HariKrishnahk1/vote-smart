import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl text-white">VoteSmart AI</span>
          <p className="text-sm mt-1 text-slate-400">Educating voters, empowering democracy.</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
      <div className="text-center text-sm text-slate-500 mt-6">
        &copy; {new Date().getFullYear()} VoteSmart AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
