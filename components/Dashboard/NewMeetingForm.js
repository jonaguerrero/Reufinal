import React, { useState } from "react";

const NewMeetingForm = ({ users, onCreateMeeting, onCancel }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time || selectedUsers.length === 0) {
      setError("Todos los campos son obligatorios");
      return;
    }
    onCreateMeeting({
      title,
      date,
      time,
      participants: selectedUsers,
      status: "pending"
    });
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nueva Reunión</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="¿De qué será esta reunión?"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Participantes
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
            {users.map(user => (
              <div key={user.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`user-${user.id}`} className="ml-2">
                  {user.name} ({user.email})
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Crear Reunión
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMeetingForm;