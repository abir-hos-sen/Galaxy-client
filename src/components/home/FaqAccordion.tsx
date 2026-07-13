'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'What is the purpose of Galaxy & Space Explorer?',
      answer: 'Galaxy & Space Explorer is an interactive digital archive designed to document, catalog, and evaluate historic space missions, major celestial objects (planets, stars, galaxies, nebulae), and record-breaking astronauts. Users can view space achievements and register to log their own scientific discoveries.',
    },
    {
      question: 'How do I add my own planetary discovery or space mission?',
      answer: 'Simply sign up for a free account, log in, and navigate to the "Add Entry" page. From there, fill out the details (title, category, short & long description, distance, agency, and image URL) and submit. You can then manage and edit your logged entries from the dashboard.',
    },
    {
      question: 'Where does the data on this platform come from?',
      answer: 'The primary catalog consists of real, verified astronomical and spaceflight history compiled from official public databases hosted by space agencies like NASA and the European Space Agency (ESA). Community submissions are contributed and moderated by registry members.',
    },
    {
      question: 'Can I leave reviews and ratings on other space entries?',
      answer: 'Yes! Any registered user who is logged in can rate a space entry (from 1 to 5 stars) and write a short review sharing their insights or experiences. The overall rating displayed on each entry is calculated as the average of all submitted user reviews.',
    },
    {
      question: 'What benefits does the Admin role have?',
      answer: 'Administrators have moderating power across the registry. Admins can delete any user-submitted space entry or review to remove spam, and have access to an admin dashboard to audit all registered user accounts and suspend or remove accounts if they violate community terms.',
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="bg-[#111430]/40 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#6C5CE7]/30"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
            >
              <div className="flex items-center space-x-3 pr-4">
                <HelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-[#FFC947]' : 'text-[#6C5CE7]'}`} />
                <span className="font-display font-semibold text-sm sm:text-base text-white hover:text-[#6C5CE7] transition-colors">
                  {faq.question}
                </span>
              </div>
              <div className="shrink-0 text-slate-400">
                {isOpen ? <ChevronUp className="h-5 w-5 text-[#FFC947]" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </button>

            {/* Answer body */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[300px] border-t border-slate-800/40' : 'max-h-0'
              }`}
            >
              <div className="p-6 text-sm sm:text-base leading-relaxed text-[#94A3B8] bg-slate-900/10">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
