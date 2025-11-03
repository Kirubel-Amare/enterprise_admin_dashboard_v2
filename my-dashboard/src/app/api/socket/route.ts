import { NextRequest, NextResponse } from 'next/server';
import { Server } from 'socket.io';

export async function GET(req: NextRequest) {
  // This will be handled by our Socket.io server
  return NextResponse.json({ message: 'Socket.IO endpoint' });
}

// Socket.io server setup (separate file recommended for production)
export function initializeSocket(server: any) {
  const io = new Server(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-users-room', () => {
      socket.join('users-room');
      console.log(`Socket ${socket.id} joined users-room`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}