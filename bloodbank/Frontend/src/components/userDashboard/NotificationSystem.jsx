import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { BsBell, BsBellFill } from 'react-icons/bs'; // Importing bell icons from react-icons

const NotificationSystem = () => {
  const notificationsData = [
    {
      id: 1,
      message: "Your blood request has been approved.",
      date: "2024-10-01",
      details: "Your blood request has been successfully processed. Please check the donation schedule."
    },
    {
      id: 2,
      message: "Upcoming blood donation drive on 2024-10-15.",
      date: "2024-10-05",
      details: "Don't miss the upcoming blood donation drive at the City Hall. Your participation can save lives!"
    },
    // More notifications...
  ];

  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    gsap.from(notificationRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const handleNotificationClick = (notification) => {
    // Mark notification as read by changing its background color
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    setSelectedNotification(notification);
  };

  const closePopup = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="relative bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-3xl font-semibold mb-4 text-center text-green-700">
        <BsBell className="align-middle mr-2" />
        Notifications
      </h2>
      <motion.div
        ref={notificationRef}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 ${
              notification.read ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="mr-3 text-green-600">
              {notification.read ? (
                <BsBellFill className="text-2xl" />
              ) : (
                <BsBell className="text-2xl" />
              )}
            </div>
            <div className="flex-grow">
              <p className="text-lg font-medium">{notification.message}</p>
              <span className="text-gray-500 text-sm">{notification.date}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Popup for Notification Details */}
      {selectedNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">{selectedNotification.message}</h3>
            <p className="mb-4">{selectedNotification.details}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notification Bell Icon */}
      <div className="absolute top-4 right-4">
        <BsBell className="text-3xl text-green-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default NotificationSystem;
