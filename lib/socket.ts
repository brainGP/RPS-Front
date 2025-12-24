import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function createSocket(): Socket {
  const newSocket = io("https://dd83fcce2dbd79b9-103-212-162-27.serveousercontent.com", {
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
