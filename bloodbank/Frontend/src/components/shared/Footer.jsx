import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Footer = () => {
  return (
    <div className="bg-slate-100">
      <footer className="bg-gray-900 text-white py-8 mt-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4 hover:text-red-400 transition duration-300">
                About Us
              </h3>
              <p className="text-sm hover:text-gray-300 transition duration-300">
                We are dedicated to saving lives by ensuring an easy and reliable way for people to donate and receive blood. Join us in making a difference.
              </p>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4 hover:text-red-400 transition duration-300">
                Contact Us
              </h3>
              <p className="text-sm hover:text-gray-300 transition duration-300">
                123 Bloodline Avenue, LifeCity, 456789
              </p>
              <p className="text-sm mt-2 hover:text-gray-300 transition duration-300">
                Email: <a href="mailto:contact@bloodbank.com" className="underline">contact@bloodbank.com</a>
              </p>
              <p className="text-sm mt-2 hover:text-gray-300 transition duration-300">
                Phone: +1 (555) 123-4567
              </p>
            </div>

            {/* Useful Links */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4 hover:text-red-400 transition duration-300">
                Useful Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/request-blood" className="hover:text-red-400 transition duration-300">Request Blood</Link>
                </li>
                <li>
                  <Link to="/donate-blood" className="hover:text-red-400 transition duration-300">Donate Blood</Link>
                </li>
                <li>
                  <Link to="/chat" className="hover:text-red-400 transition duration-300">ChatBot</Link>
                </li>
                <li>
                  <Link to="/faqs" className="hover:text-red-400 transition duration-300">FAQs</Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-red-400 transition duration-300">Stories</Link>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4 hover:text-red-400 transition duration-300">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-red-400 transition duration-300" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-red-400 transition duration-300" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-red-400 transition duration-300" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white hover:text-red-400 transition duration-300" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-bold mb-4 hover:text-red-400 transition duration-300">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-300 mb-4">Stay updated with the latest news and blood donation drives.</p>
            <div className="flex justify-center">
              <input
                type="email"
                className="px-4 py-2 w-full max-w-md text-black rounded-l-lg focus:outline-none"
                placeholder="Enter your email"
              />
              <button className="bg-red-500 text-white px-6 py-2 rounded-r-lg hover:bg-red-600 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 mt-8 pt-4">
            <p className="text-center text-sm text-gray-400">
              © 2024 BloodLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
