import React, { useState, useEffect, useRef } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLiveChat, setIsLiveChat] = useState(false);
  const messagesEndRef = useRef(null); // Reference for scrolling to the bottom

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate a delay for bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      scrollToBottom(); // Scroll to the bottom after new message
    }, 500);

    setInput('');
    scrollToBottom(); // Scroll to the bottom after user message
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('donate')) {
      return 'To donate blood, please visit your nearest blood bank and ensure you meet the eligibility criteria.';
    } else if (lowerInput.includes('eligibility')) {
      return 'You must be at least 18 years old, weigh at least 110 pounds, and be in good health to donate blood.';
    } else if (lowerInput.includes('process')) {
      return 'The donation process involves registration, a health screening, the donation, and a recovery period.';
    } else if (lowerInput.includes('event')) {
      return 'Upcoming blood donation drives are happening at various locations. Please check our Events section for details!';
    } else {
      return 'I am here to help! You can ask me about the donation process, eligibility, or how to donate.';
    }
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sample resource links
  const resources = [
    { title: 'How to Donate Blood', link: 'https://www.example.com/donate-blood' },
    { title: 'Blood Types Explained', link: 'https://www.example.com/blood-types' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Blood Bank Chatbot</h1>

        {/* Chat Messages */}
        <div className="border border-gray-300 rounded-lg p-4 h-72 overflow-y-auto mb-6 bg-white shadow-md">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg transition duration-300 ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Start chatting with the bot!</p>
          )}
          <div ref={messagesEndRef} /> {/* Reference for scrolling */}
        </div>

        {/* Chat Input */}
        <form onSubmit={sendMessage} className="flex mb-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-l-lg px-4 py-2 flex-grow focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </form>

        {/* Chatbot Menu */}
<div className="mt-4 bg-white shadow-md rounded-lg p-4">
  <h2 className="text-2xl font-semibold mb-2">Common Queries</h2>
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => setInput('What are the eligibility criteria?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Eligibility Criteria
    </button>
    <button
      onClick={() => setInput('How do I donate blood?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      How to Donate?
    </button>
    <button
      onClick={() => setInput('Tell me about upcoming blood donation events.')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Upcoming Events
    </button>
    <button
      onClick={() => setInput('How often can I donate blood?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Donation Frequency
    </button>
    <button
      onClick={() => setInput('What should I do before donating blood?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Pre-Donation Tips
    </button>
    <button
      onClick={() => setInput('What are the side effects of donating blood?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Side Effects
    </button>
    <button
      onClick={() => setInput('Can I donate blood if I have a medical condition?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Medical Conditions
    </button>
    <button
      onClick={() => setInput('What happens to my blood after donation?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Blood Processing
    </button>
    <button
      onClick={() => setInput('How is donated blood used?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Blood Usage
    </button>
    <button
      onClick={() => setInput('How do I organize a blood donation event?')}
      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Organizing Events
    </button>
  </div>
</div>


        {/* Resource Links */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Helpful Resources</h2>
          <ul className="list-disc list-inside">
            {resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.link}
                  className="text-blue-500 hover:underline transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Live Chat Support Option */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Need Live Support?</h2>
          <button
            onClick={() => setIsLiveChat(true)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Start Live Chat
          </button>
        </div>

        {/* Live Chat Modal */}
        {isLiveChat && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Live Chat Support</h3>
              <p>Connect with a support agent for more detailed inquiries!</p>
              <button
                onClick={() => setIsLiveChat(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                End Chat
              </button>
            </div>
          </div>
        )}

        {/* Information Sections */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Blood Donation Process</h2>
          <p className="mb-2">1. Registration: Sign in at the blood bank.</p>
          <p className="mb-2">2. Health Screening: A health professional will assess your health.</p>
          <p className="mb-2">3. Donation: You will donate blood for about 10-15 minutes.</p>
          <p className="mb-2">4. Recovery: Enjoy some refreshments before leaving.</p>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Eligibility Criteria</h2>
          <p className="mb-2">You must be:</p>
          <ul className="list-disc list-inside mb-2">
            <li>At least 18 years old.</li>
            <li>Weigh at least 110 pounds (50 kg).</li>
            <li>In good health and feeling well on the day of donation.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
