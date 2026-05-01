import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your VoteSmart AI Assistant. Ask me anything about the election process, voting eligibility, or how to register!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedQA = [
    {
      q: "How do I register to vote?",
      a: "You can register to vote online through the national voter service portal, or offline by filling out Form 6 and submitting it to your local Electoral Registration Officer. You'll need proof of age and address."
    },
    {
      q: "What are the eligibility criteria?",
      a: "To be eligible to vote, you must be a citizen of the country, at least 18 years old on the qualifying date, and not disqualified by any law. You must also be enrolled in the electoral roll of your constituency."
    },
    {
      q: "Where is my polling station?",
      a: "You can find your exact polling station by searching for your name on the electoral roll via the election commission's website or by SMS using your Voter ID number."
    },
    {
      q: "What ID do I need to vote?",
      a: "Your Voter ID card (EPIC) is the primary document. However, if you don't have it, you can usually use other approved photo IDs like an Aadhaar card, PAN card, Passport, or Driving License, provided your name is on the voter list."
    }
  ];

  const handlePredefinedClick = (question, answer) => {
    setMessages(prev => [
      ...prev,
      { role: 'user', content: question },
      { role: 'assistant', content: answer }
    ]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg.content }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[calc(100vh-130px)] flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">VoteSmart AI Assistant</h1>
        <p className="text-slate-600">Ask me anything about elections, voting, and democracy.</p>
      </div>

      <div className="flex-grow bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-purple-100 text-purple-600'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                <p className="whitespace-pre-line leading-relaxed text-sm md:text-base">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Bot size={20} />
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-4 flex gap-2">
                <Loader2 size={20} className="animate-spin text-purple-600" />
                <span className="text-slate-500 text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Predefined Questions */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
          {predefinedQA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handlePredefinedClick(item.q, item.a)}
              disabled={isLoading}
              className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-primary-600 hover:bg-primary-50 hover:border-primary-200 transition-colors shadow-sm disabled:opacity-50"
            >
              {item.q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g. How do I register to vote?"
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className={isLoading ? "opacity-0" : ""} />
              {isLoading && <Loader2 size={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-2">AI can make mistakes. Verify important election details.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
