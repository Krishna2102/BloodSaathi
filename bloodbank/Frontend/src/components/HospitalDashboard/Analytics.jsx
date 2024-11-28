import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Analytics = () => {
  // Dummy data for blood request analytics
  const bloodRequestData = [
    { name: 'A+', value: 12 },
    { name: 'B-', value: 19 },
    { name: 'O+', value: 3 },
    { name: 'AB+', value: 5 },
    { name: 'A-', value: 2 },
    { name: 'O-', value: 3 },
    { name: 'B+', value: 7 },
    { name: 'AB-', value: 4 },
  ];

  const donationTrendsData = [
    { month: 'January', total: 65 },
    { month: 'February', total: 59 },
    { month: 'March', total: 80 },
    { month: 'April', total: 81 },
    { month: 'May', total: 56 },
    { month: 'June', total: 55 },
    { month: 'July', total: 40 },
  ];

  // Define a color palette for the pie chart
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF4D4D', '#4DFF4D'];

  return (
    <div className='flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg mx-auto my-10 max-w-4xl'>
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Blood Request Analytics</h2>

      {/* Pie Chart for Blood Type Requests */}
      <div className="mb-8 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Blood Type Requests</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={bloodRequestData}
            cx={200}
            cy={200}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {bloodRequestData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px' }} />
          <Legend />
        </PieChart>
      </div>

      {/* Bar Chart for Donation Trends */}
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Donation Trends</h3>
        <BarChart
          width={500}
          height={300}
          data={donationTrendsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px' }} />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </div>

      <style jsx>{`
        /* Media Queries for Responsive Design */
        @media (max-width: 768px) {
          .w-full {
            max-width: 100%; /* Full width on smaller screens */
          }

          h2 {
            font-size: 2rem; /* Slightly smaller heading */
          }

          h3 {
            font-size: 1.5rem; /* Slightly smaller subheadings */
          }

          PieChart,
          BarChart {
            width: 100%; /* Responsive width for charts */
            height: auto; /* Maintain aspect ratio */
          }
        }
      `}</style>
    </div>
  );
};

export default Analytics;
