import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'New blood request for O+ blood', urgency: 'High' },
    { id: 2, message: 'Upcoming blood donation camp at City Center', urgency: 'Medium' },
    // Add more notifications as needed
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">Notifications</h2>
      <ul className="bg-white rounded-lg shadow overflow-hidden">
        {notifications.map((notification) => (
          <li key={notification.id} className="px-4 py-3 border-b flex justify-between items-center">
            <span className="font-semibold">{notification.message}</span>
            <div className="flex items-center">
              {notification.urgency === 'High' && (
                <button className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition duration-200">
                  High
                </button>
              )}
              {notification.urgency === 'Medium' && (
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-600 transition duration-200 ml-2">
                  Medium
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {notifications.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
