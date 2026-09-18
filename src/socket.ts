import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.PROD
    ? "https://iprc-be.onrender.com"
    : `${window.location.origin.replace("5173", "3000")}`,
);
