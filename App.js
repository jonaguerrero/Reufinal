import React, { useState, useEffect } from "react";
import LoginForm from "./components/Auth/LoginForm";
import Navbar from "./components/Layout/Navbar";
import MeetingCard from "./components/Dashboard/MeetingCard";
import UserManagement from "./components/Admin/UserManagement";
import NewMeetingForm from "./components/Dashboard/NewMeetingForm";
import { users as initialUsers, meetings as initialMeetings } from "./mock/users";
import roles from "./mock/roles";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [view, setView] = useState("dashboard");
  const [showNewMeetingForm, setShowNewMeetingForm] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const updateMeetingStatus = (meetingId, status) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, status } : meeting
      )
    );
  };

  const updateUser = (userId, updatedData) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, ...updatedData };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const addUser = (newUser) => {
    const newId = Math.max(...users.map((u) => u.id), 0) + 1;
    setUsers([...users, { ...newUser, id: newId }]);
  };

  const createNewMeeting = (newMeeting) => {
    const newId = Math.max(...meetings.map((m) => m.id), 0) + 1;
    setMeetings([...meetings, { ...newMeeting, id: newId }]);
    setShowNewMeetingForm(false);
  };

  const saveMeetingNotes = (meetingId, notes) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, notes } : meeting
      )
    );
  };

  const exportMeetingsToPdf = () => {
    // This is a placeholder. Actual PDF generation requires a library
    // like jsPDF or react-pdf, which are not allowed by the constraints.
    // In a real application, you would use one of those libraries here.
    // For this example, we'll just log the data that would be exported.
    console.log("Exporting meetings to PDF:", meetings);
    alert("Exportación a PDF simulada. Revisa la consola para ver los datos.");
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={currentUser} onLogout={handleLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {view === "dashboard" ? "Mis reuniones" : "Administración"}
          </h1>
          <div className="flex space-x-4">
            {currentUser.role === "admin" && (
              <button
                onClick={() => setView(view === "dashboard" ? "admin" : "dashboard")}
                className={`px-4 py-2 rounded-md ${
                  view === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {view === "dashboard" ? "Admin Panel" : "Dashboard"}
              </button>
            )}
            {view === "dashboard" && (
              <>
                <button
                  onClick={() => setShowNewMeetingForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  + Nueva Reunión
                </button>
                <button
                  onClick={exportMeetingsToPdf}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Exportar a PDF
                </button>
              </>
            )}
          </div>
        </div>

        {showNewMeetingForm ? (
          <NewMeetingForm
            users={users.filter(u => u.id !== currentUser.id)}
            onCreateMeeting={createNewMeeting}
            onCancel={() => setShowNewMeetingForm(false)}
          />
        ) : view === "dashboard" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Reuniones pendientes</h2>
              {meetings
                .filter((m) => m.status === "pending" && 
                  (m.participants.includes(currentUser.id) || currentUser.role === "admin"))
                .map((meeting) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    users={users}
                    onStatusChange={currentUser.role === "admin" ? updateMeetingStatus : null}
                    showStatus={currentUser.role === "admin"}
                    onSaveNotes={saveMeetingNotes}
                  />
                ))}
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4">
                Reuniones aprobadas
              </h2>
              {meetings
                .filter((m) => m.status === "approved" && 
                  m.participants.includes(currentUser.id))
                .map((meeting) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    users={users}
                    showStatus={false}
                    onSaveNotes={saveMeetingNotes}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <UserManagement
              users={users}
              onUpdateUser={updateUser}
              onDeleteUser={deleteUser}
              onAddUser={addUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// DONE