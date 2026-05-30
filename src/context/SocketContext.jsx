import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../features/auth/store/authContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);
      
      newSocket.on('connect', () => {
        console.log('Socket connected');
        newSocket.emit('user-connected', user.id);
      });
      
      // Listen for online users
      newSocket.on('users-online', (users) => {
        console.log('Online users:', users);
        setOnlineUsers(users);
      });
      
      // Listen for notifications
      newSocket.on('notification', (notification) => {
        console.log('New notification:', notification);
        setNotifications(prev => [{ ...notification, read: false }, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        toast(notification.message, {
          icon: getNotificationIcon(notification.type),
          duration: 5000,
        });
      });
      
      // Listen for chat messages
      newSocket.on('receive_message', (message) => {
        console.log('New message:', message);
        setChatMessages(prev => {
          const room = message.room || 'general';
          return {
            ...prev,
            [room]: [...(prev[room] || []), message]
          };
        });
        
        // Show notification for new message
        if (message.userId !== user.id) {
          toast(`New message from user ${message.userId}`, {
            icon: '💬',
            duration: 3000,
          });
        }
      });
      
      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, user]);

  const getNotificationIcon = (type) => {
    const icons = {
      task_created: '📝',
      task_updated: '✏️',
      task_moved: '🔄',
      task_completed: '✅',
      task_deleted: '🗑️',
    };
    return icons[type] || '🔔';
  };

  const markAsRead = (index) => {
    setNotifications(prev => {
      const updated = [...prev];
      updated[index].read = true;
      return updated;
    });
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Chat functions
  const joinRoom = (room) => {
    if (socket) {
      socket.emit('join_room', room);
    }
  };

  const leaveRoom = (room) => {
    if (socket) {
      socket.emit('leave_room', room);
    }
  };

  const sendMessage = (room, message) => {
    if (socket && message.trim()) {
      socket.emit('send_message', { room, message });
    }
  };

  const sendTyping = (room, isTyping) => {
    if (socket) {
      socket.emit('typing', { room, isTyping });
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      notifications,
      unreadCount,
      onlineUsers,
      chatMessages,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      joinRoom,
      leaveRoom,
      sendMessage,
      sendTyping,
    }}>
      {children}
    </SocketContext.Provider>
  );
};
