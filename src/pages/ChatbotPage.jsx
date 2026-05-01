import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your VoteSmart AI Assistant. Ask me anything about the election process, voting eligibility, or how to register!' }
  ]);
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
    },
    {
      q: "Can I vote online?",
      a: "No, currently voting must be done in person at your designated polling station or via postal ballot if you meet specific eligibility criteria (like armed forces personnel or election duty staff)."
    },
    {
      q: "How do I check my name on the voter list?",
      a: "You can check your name on the electoral roll online through the official Election Commission portal by entering your Voter ID (EPIC) number or your personal details."
    },
    {
      q: "What if my name is missing from the list?",
      a: "If your name is missing, you cannot vote. You must submit Form 6 to register as a new voter, or contact your local Electoral Registration Officer immediately to resolve any errors."
    },
    {
      q: "What is a postal ballot?",
      a: "A postal ballot allows certain individuals, such as armed forces personnel, election duty staff, or people with disabilities, to cast their vote by mail instead of visiting a polling station."
    }
  ];

  const handlePredefinedClick = (question, answer) => {
    setMessages(prev => [
      ...prev,
      { role: 'user', content: question },
      { role: 'assistant', content: answer }
    ]);
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

        {/* Predefined Questions Area */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider text-center">Select a question</p>
          <div className="flex flex-wrap justify-center gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pb-2">
            {predefinedQA.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handlePredefinedClick(item.q, item.a)}
                disabled={isLoading}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-primary-600 hover:bg-primary-50 hover:border-primary-300 transition-all shadow-sm disabled:opacity-50 text-left"
              >
                {item.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
