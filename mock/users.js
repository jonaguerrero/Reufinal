const users = [
  {
    id: 1,
    email: "logistica@explorair.cl",
    password: "J28071991n",
    name: "Admin Principal",
    role: "admin",
  },
  {
    id: 2,
    email: "Mantenimiento@explorair.cl",
    password: "explorair22",
    name: "Ruben Zambrano",
    role: "user",
  },
  {
    id: 3,
    email: "jhuenchunao@explorair.cl",
    password: "explorair22",
    name: "Jorge Huenchunao",
    role: "user",
  },
];

const meetings = [
  {
    id: 1,
    title: "Reunión de sprint",
    date: "2023-05-15",
    time: "10:00",
    participants: [2, 3],
    status: "pending",
  },
  {
    id: 2,
    title: "Revisión de proyecto",
    date: "2023-05-16",
    time: "15:30",
    participants: [1, 2],
    status: "approved",
  },
];

export { users, meetings };