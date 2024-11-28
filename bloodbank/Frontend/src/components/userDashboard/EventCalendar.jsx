import React, { useState } from 'react';
import Calendar from 'react-calendar';

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upcoming Blood Donation Events</h2>
      <Calendar onChange={setDate} value={date} />
      {/* Show events based on selected date */}
    </div>
  );
};

export default EventCalendar;
