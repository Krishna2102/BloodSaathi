import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing icons for show/hide functionality
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const FaqSection = () => {
  const faqs = [
    {
      question: 'How often can I donate blood?',
      answer: 'You can donate blood every 56 days, or 8 weeks.',
    },
    {
      question: 'What should I do after donating blood?',
      answer: 'Rest for a few minutes, hydrate, and have a snack to help replenish your energy.',
    },
    {
      question: 'Is it safe to donate blood?',
      answer: 'Yes, blood donation is a safe procedure and is done under sterile conditions.',
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null); // State to track the expanded FAQ

  const toggleFaq = (index) => {
    // Toggle the expanded index
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
    <Navbar/>
    <div className="mt-32">
      
      <h2 className="text-3xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)} // Toggle FAQ on click
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              {expandedIndex === index ? (
                <FaChevronUp className="text-blue-600" />
              ) : (
                <FaChevronDown className="text-blue-600" />
              )}
            </div>
            {expandedIndex === index && (
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default FaqSection;
