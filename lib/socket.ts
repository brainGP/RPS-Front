import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function createSocket(): Socket {
  const newSocket = io("https://83db04f3061c93868f6a5125ed869ed1.serveousercontent.com", {
    transports: ["websocket"],
    reconnection: true,
  });
  socket = newSocket;
  return newSocket;
}

export function getSocket(): Socket {
  if (!socket) {
    socket = createSocket();
  }
  return socket;
}
