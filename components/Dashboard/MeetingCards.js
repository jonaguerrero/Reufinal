import React, { useState } from "react";
import MeetingNotes from "./MeetingNotes";

const MeetingCard = ({ meeting, users, onStatusChange, showStatus = true, onSaveNotes }) => {
  const participantsNames = meeting.participants.map((id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "Usuario desconocido";
  });

  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg text-gray-900">{meeting.title}</h3>
          <p className="text-gray-600">
            {meeting.date} a las {meeting.time}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Participantes: {participantsNames.join(", ")}
          </p>
        </div>
        <div className="flex space-x-2">
          {showStatus && meeting.status === "pending" && onStatusChange && (
            <button
              onClick={() => onStatusChange(meeting.id, "approved")}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Aprobar
            </button>
          )}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
          >
            {showNotes ? "Ocultar Anotaciones" : "Ver Anotaciones"}
          </button>
        </div>
      </div>
      {showNotes && <MeetingNotes meeting={meeting} onSaveNotes={onSaveNotes} />}
    </div>
  );
};

export default MeetingCard;