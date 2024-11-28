import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component to manage blood inventory
const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]); // Initialize with an empty array
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [newBlood, setNewBlood] = useState({
    bloodGroup: '',
    quantity: '',
  });

  // Function to fetch blood inventory data
  const bloodRequestData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/hospital/stock/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setInventory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch inventory on component mount
  useEffect(() => {
    bloodRequestData();
  }, []);

  // Function to add new blood unit
  const handleAddBlood = async (e) => {
    e.preventDefault();
    const newEntry = {
      bloodGroup: newBlood.bloodGroup,
      quantity: parseInt(newBlood.quantity),
    };

    try {
      await axios.post('http://localhost:3000/api/hospital/stock/maintain', newEntry, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresh inventory after adding
      bloodRequestData();
    } catch (error) {
      console.error(error);
    }

    setNewBlood({ bloodGroup: '', quantity: '' }); // Reset form
  };

  // Function to sort inventory
  const sortInventory = (key) => {
    const sortedInventory = [...inventory].sort((a, b) => {
      return sortOrder === 'asc' ? a[key] - b[key] : b[key] - a[key];
    });
    setInventory(sortedInventory);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Function to filter inventory
  const filteredInventory = inventory.filter(item =>
    item.bloodGroup.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Blood Inventory Management</h2>

      {/* Add Blood Form */}
      <form onSubmit={handleAddBlood} className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-green-600">Add New Blood Unit</h3>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={newBlood.bloodGroup}
            onChange={(e) => setNewBlood({ ...newBlood, bloodGroup: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input
            type="number"
            placeholder="Quantity"
            className="border border-gray-300 rounded px-4 py-2"
            value={newBlood.quantity}
            onChange={(e) => setNewBlood({ ...newBlood, quantity: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 font-semibold"
        >
          Add Blood
        </button>
      </form>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Blood Group..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => sortInventory('bloodGroup')}>
              Blood Group
            </th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => sortInventory('quantity')}>
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-2 px-4 border-b text-sm text-gray-700">{item.bloodGroup}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-2 px-4 border-b text-sm text-gray-700 text-center">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;