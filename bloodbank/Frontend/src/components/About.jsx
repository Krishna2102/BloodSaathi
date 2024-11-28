import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import FaqSection from './FaqSection';

const About = () => {
  const allResources = [
    {
      title: 'The Importance of Blood Donation',
      description: 'Learn why donating blood is critical for saving lives and maintaining blood supply.',
      link: '#',
      type: 'article',
    },
    {
      title: 'Blood Types and Compatibility',
      description: 'Understand the different blood types and how compatibility works between donors and recipients.',
      link: '#',
      type: 'video',
    },
    {
      title: 'Health Tips for Donors',
      description: 'Get useful health tips to stay fit and ready for your next blood donation.',
      link: '#',
      type: 'article',
    },
    {
      title: 'Eligibility to Donate Blood',
      description: 'Find out if you are eligible to donate blood and learn about donation requirements.',
      link: '#',
      type: 'article',
    },
  ];

  // State management
  const [resources, setResources] = useState(allResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expanded, setExpanded] = useState(null); // Expand/Collapse resources

  // Eligibility Checker State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [isHealthy, setIsHealthy] = useState(null);
  const [isEligible, setIsEligible] = useState(null);

  // Search and filter functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterResources(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterResources(searchTerm, category);
  };

  const filterResources = (search, category) => {
    let filtered = allResources.filter((resource) =>
      resource.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'all') {
      filtered = filtered.filter((resource) => resource.type === category);
    }
    setResources(filtered);
  };

  // Eligibility check logic
  const checkEligibility = () => {
    const ageNum = parseInt(age);
    const weightNum = parseInt(weight);

    if (ageNum >= 18 && weightNum >= 50 && isHealthy) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-blue-600"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Educational Resources
        </motion.h1>

        {/* Search Bar */}
        <motion.div 
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search resources..."
            className="border rounded-lg px-4 py-2 w-full max-w-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={handleSearch}
          />
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="mb-6 flex justify-center space-x-4"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            All
          </button>
          <button
            onClick={() => handleCategoryChange('article')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedCategory === 'article' ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Articles
          </button>
          <button
            onClick={() => handleCategoryChange('video')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedCategory === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Videos
          </button>
        </motion.div>

        {/* Resource Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-2 text-blue-600">{resource.title}</h2>
                <p
                  className={`text-gray-600 mb-4 cursor-pointer ${expanded === index ? 'block' : 'truncate'}`}
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  className="inline-block text-blue-500 hover:text-blue-700 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View {resource.type}
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No resources found.</p>
          )}
        </div>

        {/* Blood Donation Eligibility Checker */}
        <motion.div 
          className="mt-12 p-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-center">Blood Donation Eligibility Checker</h2>
          <p className="mb-4 text-center">Take a quick survey to check if you're eligible to donate blood.</p>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 mx-auto block"
            onClick={() => setIsModalOpen(true)}
          >
            Check Eligibility
          </button>
        </motion.div>

        {/* Eligibility Modal */}
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Check Your Eligibility</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  checkEligibility();
                }}
              >
                <div className="mb-4">
                  <label className="block mb-2">Enter your age:</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Enter your weight (kg):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Are you in good health?</label>
                  <select
                    value={isHealthy}
                    onChange={(e) => setIsHealthy(e.target.value === 'true')}
                    className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Check Eligibility
                </button>
              </form>
              {isEligible !== null && (
                <p className={`mt-4 text-lg font-semibold ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
                  {isEligible ? 'You are eligible to donate blood!' : 'You are not eligible to donate blood.'}
                </p>
              )}
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
