import React, { useState } from 'react';

const MilitaryShiftsApp = () => {
  const soldiersList = [
    "לבנטר",
    "אוריאל",
    "אמסלם",
    "שקד",
    "חפיף",
    "שי",
    "אלמסי",
    "מוטי",
    "נתן",
    "לידור",
    "שחר",
    "מלכה",
    "תומר",
    "שמח",
    "דנציגר",
  ]

  const [soldiers, setSoldiers] = useState(soldiersList);
  const [newSoldier, setNewSoldier] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [soldiersPerShift, setSoldiersPerShift] = useState(2);
  const [schedule, setSchedule] = useState('');

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const addSoldier = () => {
    if (newSoldier.trim() !== '') {
      setSoldiers([...soldiers, newSoldier.trim()]);
      setNewSoldier('');
    }
  };

  const removeSoldier = (index) => {
    setSoldiers(soldiers.filter((_, i) => i !== index));
  };

  const generateSchedule = () => {
    if (soldiers.length === 0 || !startTime || !endTime || !duration || soldiersPerShift < 1) {
      alert('Please fill in all fields.');
      return;
    }

    const shuffledSoldiers = shuffleArray(soldiers);
    const shiftDuration = parseInt(duration, 10); // in minutes

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (start >= end || isNaN(shiftDuration)) {
      alert('Invalid time range or duration.');
      return;
    }

    let current = new Date(start);
    let scheduleText = '';
    let index = 0;

    while (current < end) {
      const next = new Date(current.getTime() + shiftDuration * 60000);
      const shiftSoldiers = [];

      for (let i = 0; i < soldiersPerShift; i++) {
        shiftSoldiers.push(shuffledSoldiers[index % shuffledSoldiers.length]);
        index++;
      }

      scheduleText += `${shiftSoldiers.join(', ')} - ${current.toTimeString().slice(0, 5)} - ${next.toTimeString().slice(0, 5)}\n`;
      current = next;
    }

    setSchedule(scheduleText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schedule).then(
      () => alert('Schedule copied to clipboard!'),
      (err) => alert('Failed to copy schedule.')
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Military Shift Scheduler</h1>

      <div>
        <label style={{ fontSize: '1rem' }}>Soldier Name:</label>
        <input
          type="text"
          value={newSoldier}
          onChange={(e) => setNewSoldier(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', fontSize: '1rem' }}
        />
        <button onClick={addSoldier} style={{ marginBottom: '10px', padding: '10px 15px', fontSize: '1rem' }}>Add Soldier</button>

        <ul style={{ paddingLeft: '20px', fontSize: '1rem' }}>
          {soldiers.map((soldier, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              {soldier} <button onClick={() => removeSoldier(index)} style={{ padding: '5px 10px', fontSize: '0.9rem' }}>Remove</button>
            </li>
          ))}
        </ul>

        <label style={{ fontSize: '1rem' }}>Start Time (HH:MM):</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', fontSize: '1rem' }}
        />

        <label style={{ fontSize: '1rem' }}>End Time (HH:MM):</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', fontSize: '1rem' }}
        />

        <label style={{ fontSize: '1rem' }}>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', fontSize: '1rem' }}
        />

        <label style={{ fontSize: '1rem' }}>Soldiers Per Shift:</label>
        <input
          type="number"
          value={soldiersPerShift}
          onChange={(e) => setSoldiersPerShift(parseInt(e.target.value, 10))}
          style={{ width: '100%', marginBottom: '20px', padding: '8px', fontSize: '1rem' }}
        />

        <button onClick={generateSchedule} style={{ marginRight: '10px', padding: '10px 15px', fontSize: '1rem' }}>Generate Schedule</button>
        <button onClick={copyToClipboard} style={{ padding: '10px 15px', fontSize: '1rem' }}>Copy Schedule</button>
      </div>

      <textarea
        value={schedule}
        readOnly
        style={{ width: '100%', height: '200px', marginTop: '20px', padding: '10px', fontSize: '1rem', resize: 'none' }}
      />
    </div>
  );
};

export default MilitaryShiftsApp;
