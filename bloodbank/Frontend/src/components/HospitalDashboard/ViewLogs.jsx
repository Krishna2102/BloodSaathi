import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const ViewLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/hospital/pending-request', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching blood requests:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log =>
    log.bloodGroup.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedLogs = filteredLogs.sort((a, b) => {
    return sortOrder === 'asc' ? a.date - b.date : b.date - a.date;
  });

  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Completed': return { color: 'text-green-500', icon: <FaCheckCircle className="inline-block mr-1" /> };
      case 'Pending': return { color: 'text-yellow-500', icon: <FaExclamationTriangle className="inline-block mr-1" /> };
      case 'Rejected': return { color: 'text-red-500', icon: <FaTimesCircle className="inline-block mr-1" /> };
      default: return { color: 'text-gray-500', icon: null };
    }
  };

  const totalPages = Math.ceil(sortedLogs.length / logsPerPage);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">View Blood Logs</h2>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Filter by Blood Group"
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

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">User Name</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Blood Group</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Quantity</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.length > 0 ? (
            paginatedLogs.map(log => {
              const { color, icon } = getStatusInfo(log.status);
              return (
                <tr key={log._id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-2 px-4 border-b text-sm text-gray-700">{log.userId?.name || 'Unknown'}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">{log.bloodGroup}</td>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">{log.quantity}</td>
                  <td className={`py-2 px-4 border-b text-sm ${color}`}>
                    {icon}
                    {log.status}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b text-sm text-gray-700 text-center">
                No logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewLogs;
