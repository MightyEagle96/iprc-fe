import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.PROD
    ? "https://iprc-be.onrender.com"
    : "http://localhost:3000",
);
