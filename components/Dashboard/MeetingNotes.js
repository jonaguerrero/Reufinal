import React, { useState } from "react";

const MeetingNotes = ({ meeting, onSaveNotes }) => {
  const [notes, setNotes] = useState(meeting.notes || "");

  const handleSave = () => {
    onSaveNotes(meeting.id, notes);
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <h4 className="font-medium text-gray-800 mb-2">Anotaciones</h4>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md resize-none"
        rows="4"
        placeholder="Escribe aquí las anotaciones de la reunión..."
      ></textarea>
      <button
        onClick={handleSave}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
      >
        Guardar Anotaciones
      </button>
    </div>
  );
};

export default MeetingNotes;