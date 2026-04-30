import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, UserCheck, Calendar, Inbox, BarChart } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Voter Registration',
    icon: <UserCheck className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
    description: 'Ensure you are registered to vote. You must be 18 years old and a citizen. Check your name on the electoral roll.',
    details: 'You can register online through the National Voters Service Portal (NVSP) or by filling Form 6 offline. Make sure to keep your identity and address proofs ready.'
  },
  {
    id: 2,
    title: 'Verification',
    icon: <MapPin className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
    description: 'Find your polling booth and get your voter slip.',
    details: 'A few weeks before the election, you can search for your polling booth online or receive a voter slip at your home. Keep your EPIC (Voter ID) card safe.'
  },
  {
    id: 3,
    title: 'Polling Day',
    icon: <Calendar className="w-6 h-6" />,
    color: 'bg-amber-100 text-amber-600',
    description: 'Visit your designated polling booth on the election day.',
    details: 'Go early to avoid crowds. Stand in the queue, show your ID to the polling officer, and wait for your turn. Cell phones are usually not allowed inside.'
  },
  {
    id: 4,
    title: 'Vote Casting',
    icon: <Inbox className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
    description: 'Cast your vote secretly using the EVM.',
    details: 'Press the blue button against the candidate of your choice on the Electronic Voting Machine (EVM). Wait for the beep sound. Verify your vote via the VVPAT slip.'
  },
  {
    id: 5,
    title: 'Counting & Results',
    icon: <BarChart className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600',
    description: 'Votes are counted and the winner is declared.',
    details: 'On the scheduled counting day, EVMs are opened under strict security. The candidate with the highest number of valid votes in a constituency is declared the winner.'
  }
];

const TimelineItem = ({ step, index, activeStep, setActiveStep }) => {
  const isActive = activeStep === index;

  return (
    <div className="relative pl-8 md:pl-0">
      {/* Desktop Timeline line */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10"></div>
      
      {/* Mobile Timeline line */}
      <div className="md:hidden absolute top-0 left-4 w-0.5 h-full bg-slate-100 -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="mb-8 md:mb-0 relative"
      >
        <button 
          onClick={() => setActiveStep(isActive ? null : index)}
          className={`w-full text-left md:text-center group ${isActive ? 'scale-105' : ''} transition-transform duration-300`}
        >
          <div className="md:mx-auto relative z-10 w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors duration-300 bg-white group-hover:border-primary-50">
            <div className={`w-full h-full rounded-full flex items-center justify-center ${step.color}`}>
              {step.icon}
            </div>
          </div>
          
          <div className="mt-4 md:mt-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step {step.id}</span>
              {isActive ? <ChevronUp className="text-slate-400 w-5 h-5" /> : <ChevronDown className="text-slate-400 w-5 h-5" />}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <p className="text-slate-700 text-sm">{step.details}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </motion.div>
    </div>
  );
};

const GuidePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Election Process Guide</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Understanding the democratic process is your first step to making a difference. Follow our step-by-step timeline below.</p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <TimelineItem 
              key={step.id} 
              step={step} 
              index={index} 
              activeStep={activeStep} 
              setActiveStep={setActiveStep} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
