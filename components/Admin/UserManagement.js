import React, { useState } from "react";
import roles from "../../mock/roles";
import RegisterForm from "../Auth/RegisterForm";

const UserManagement = ({ users, onUpdateUser, onDeleteUser, onAddUser }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditedName(user.name);
    setEditedRole(user.role);
  };

  const handleSave = (id) => {
    onUpdateUser(id, { name: editedName, role: editedRole });
    setEditingId(null);
  };

  const handleRegister = (newUser) => {
    onAddUser(newUser);
    setShowRegisterForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestión de usuarios</h2>
        <button
          onClick={() => setShowRegisterForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Nuevo usuario
        </button>
      </div>

      {showRegisterForm ? (
        <RegisterForm
          onRegister={handleRegister}
          onCancel={() => setShowRegisterForm(false)}
        />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">{user.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user.id ? (
                      <select
                        value={editedRole}
                        onChange={(e) => setEditedRole(e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === user.id ? (
                      <>
                        <button
                          onClick={() => handleSave(user.id)}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => onDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;