import React, { useState } from 'react';
import { Chart } from 'react-google-charts';

const InventoryManagement = () => {
  const [bloodInventory, setBloodInventory] = useState([
    { id: 1, type: 'A+', quantity: 10, donorName: 'John Doe' },
    { id: 2, type: 'B+', quantity: 8, donorName: 'Jane Smith' },
    { id: 3, type: 'O-', quantity: 5, donorName: 'Mike Johnson' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [formData, setFormData] = useState({ type: '', quantity: '', donorName: '', id: null });

  const addBloodUnit = (bloodData) => {
    const newId = bloodInventory.length + 1;
    setBloodInventory([...bloodInventory, { ...bloodData, id: newId }]);
    setShowModal(false);
  };

  const updateBloodUnit = (bloodId, updatedData) => {
    setBloodInventory(
      bloodInventory.map((bloodUnit) =>
        bloodUnit.id === bloodId ? { ...bloodUnit, ...updatedData } : bloodUnit
      )
    );
    setShowModal(false);
  };

  const deleteBloodUnit = (bloodId) => {
    setBloodInventory(bloodInventory.filter((bloodUnit) => bloodUnit.id !== bloodId));
  };

  const chartData = [
    ['Blood Type', 'Quantity'],
    ...bloodInventory.map((unit) => [unit.type, unit.quantity]),
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalContent === 'add') {
      addBloodUnit(formData);
    } else if (modalContent === 'update') {
      updateBloodUnit(formData.id, formData);
    }
    setFormData({ type: '', quantity: '', donorName: '', id: null });
  };

  const openModal = (content, bloodUnit = null) => {
    if (content === 'update' && bloodUnit) {
      setFormData(bloodUnit);
    } else {
      setFormData({ type: '', quantity: '', donorName: '', id: null });
    }
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-red-500 to-red-300rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Blood Inventory Management</h2>

      <button onClick={() => openModal('add')} className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200">
        Add Blood Unit
      </button>

      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden mt-4">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Quantity</th>
            <th className="py-3 px-4 text-left">Donor Name</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bloodInventory.map((bloodUnit) => (
            <tr key={bloodUnit.id} className="hover:bg-gray-100">
              <td className="py-3 px-4">{bloodUnit.id}</td>
              <td className="py-3 px-4">{bloodUnit.type}</td>
              <td className="py-3 px-4">{bloodUnit.quantity}</td>
              <td className="py-3 px-4">{bloodUnit.donorName}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => deleteBloodUnit(bloodUnit.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8  ">
        <h3 className="text-lg font-bold mb-4">Blood Inventory Chart</h3>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={{
            title: 'Blood Type Distribution',
            is3D: true,
          }}
          width="100%"
          height="400px"
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>

            {modalContent === 'add' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Add New Blood Unit</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Blood Type:</label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Donor Name:</label>
                    <input
                      type="text"
                      value={formData.donorName}
                      onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                  >
                    Add Blood Unit
                  </button>
                </form>
              </div>
            )}

            {modalContent === 'update' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Update Blood Unit</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Blood Type:</label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Donor Name:</label>
                    <input
                      type="text"
                      value={formData.donorName}
                      onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Update Blood Unit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
