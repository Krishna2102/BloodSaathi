export default function UserTypeSelector({ userType, handleChange }) {
    return (
      <div className="col-span-2 mb-4">
        <label className="block text-sm font-medium mb-2">User Type</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="person"
              checked={userType === "person"}
              onChange={handleChange}
              className="mr-2"
              required
            />
            Person
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="hospital"
              checked={userType === "hospital"}
              onChange={handleChange}
              className="mr-2"
              required
            />
            Hospital
          </label>
        </div>
      </div>
    );
  }
  