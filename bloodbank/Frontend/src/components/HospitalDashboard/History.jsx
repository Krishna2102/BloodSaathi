import React, { useState } from 'react';

const History = () => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const historyLogs = [
    { id: 1, bloodType: 'A+', status: 'Fulfilled', date: '2023-09-10' },
    { id: 2, bloodType: 'B+', status: 'Pending', date: '2023-09-12' },
    { id: 3, bloodType: 'O+', status: 'Fulfilled', date: '2023-09-15' },
    // Add more logs as needed
  ];

  const notificationHistory = [
    { id: 1, message: 'A+ blood request created', date: '2023-09-15' },
    { id: 2, message: 'Blood donation camp scheduled', date: '2023-09-10' },
    { id: 3, message: 'B+ blood request fulfilled', date: '2023-09-12' },
    // Add more notifications as needed
  ];

  const filteredLogs = historyLogs.filter(log =>
    log.bloodType.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedLogs = filteredLogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleRowClick = (log) => {
    alert(`Details for ${log.bloodType}: ${log.status} on ${log.date}`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">History</h2>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Filter by Blood Type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded flex-grow mr-2"
        />
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="asc">Sort by Date Ascending</option>
          <option value="desc">Sort by Date Descending</option>
        </select>
      </div>

      <h3 className="text-lg font-semibold mb-2">Blood Request History</h3>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              Blood Type
            </th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Status</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedLogs.length > 0 ? (
            sortedLogs.map(log => (
              <tr key={log.id} onClick={() => handleRowClick(log)} className="cursor-pointer hover:bg-gray-100 transition duration-200">
                <td className="py-2 px-4 border-b text-sm text-gray-700">{log.bloodType}</td>
                <td className={`py-2 px-4 border-b text-sm ${log.status === 'Fulfilled' ? 'text-green-600' : 'text-red-600'}`}>{log.status}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{log.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 border-b text-sm text-gray-700 text-center">
                No logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-2">Notification History</h3>
      <ul className="border border-gray-300 rounded-lg bg-white shadow-md">
        {notificationHistory.length > 0 ? (
          notificationHistory.map(notification => (
            <li key={notification.id} className="border-b py-2 px-4 flex justify-between">
              <span className="font-semibold">{notification.message}</span>
              <span className="text-gray-500">{notification.date}</span>
            </li>
          ))
        ) : (
          <li className="py-2 text-center text-gray-500">No notifications found.</li>
        )}
      </ul>
    </div>
  );
};

export default History;
