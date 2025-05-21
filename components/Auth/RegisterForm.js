import React, { useState } from "react";
import roles from "../../mock/roles";

const RegisterForm = ({ onRegister, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    onRegister({ name, email, password, role });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Registrar nuevo usuario
      </h2>
      {error && (
        <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Rol
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;