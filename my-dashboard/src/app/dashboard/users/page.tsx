'use client';

import { Card } from '@/components/ui/Card'
import { Users, UserPlus, UserCheck, UserX, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSocket } from '@/lib/socket'

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
  lastLogin?: string;
}

interface UsersData {
  stats: Array<{
    title: string;
    value: string;
    description: string;
  }>;
  users: User[];
}

const iconMap = {
  "Total Users": <Users className="h-6 w-6" />,
  "New Users": <UserPlus className="h-6 w-6" />,
  "Active Users": <UserCheck className="h-6 w-6" />,
  "Inactive Users": <UserX className="h-6 w-6" />
}

export default function UsersPage() {
  const [data, setData] = useState<UsersData>({
    stats: [
      { title: "Total Users", value: "0", description: "Loading..." },
      { title: "New Users", value: "0", description: "Loading..." },
      { title: "Active Users", value: "0", description: "Loading..." },
      { title: "Inactive Users", value: "0", description: "Loading..." }
    ],
    users: []
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { socket, isConnected } = useSocket();

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const usersData = await response.json();
      setData(usersData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch users data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUsersData();
  }, []);

  // Real-time updates setup
  useEffect(() => {
    if (!socket) return;

    // Join the users room for real-time updates
    socket.emit('join-users-room');

    // Listen for user updates
    socket.on('users-updated', (updatedData: UsersData) => {
      setData(updatedData);
      setLastUpdated(new Date());
    });

    // Listen for new user creation
    socket.on('user-created', (newUser: User) => {
      setData(prev => ({
        ...prev,
        users: [newUser, ...prev.users],
        stats: prev.stats.map(stat => {
          if (stat.title === "Total Users") {
            return { ...stat, value: (parseInt(stat.value) + 1).toString() };
          }
          if (stat.title === "New Users") {
            return { ...stat, value: (parseInt(stat.value) + 1).toString() };
          }
          return stat;
        })
      }));
      setLastUpdated(new Date());
    });

    // Listen for user updates
    socket.on('user-updated', (updatedUser: User) => {
      setData(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        )
      }));
      setLastUpdated(new Date());
    });

    // Listen for user deletion
    socket.on('user-deleted', (deletedUserId: string) => {
      setData(prev => ({
        ...prev,
        users: prev.users.filter(user => user.id !== deletedUserId),
        stats: prev.stats.map(stat => {
          if (stat.title === "Total Users") {
            return { ...stat, value: (parseInt(stat.value) - 1).toString() };
          }
          return stat;
        })
      }));
      setLastUpdated(new Date());
    });

    return () => {
      socket.off('users-updated');
      socket.off('user-created');
      socket.off('user-updated');
      socket.off('user-deleted');
    };
  }, [socket]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">Manage your users and permissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchUsersData}
            disabled={loading}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.stats.map((stat, index) => (
          <Card 
            key={index}
            title={stat.title} 
            value={stat.value} 
            description={stat.description}
            icon={iconMap[stat.title as keyof typeof iconMap]}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="flex justify-center items-center">
                      <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                    </div>
                  </td>
                </tr>
              ) : data.users.length > 0 ? (
                data.users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'Unknown User'}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {user.role || 'user'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin || 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="text-gray-500 text-sm">No users found</div>
                    <div className="text-gray-400 text-xs mt-1">Users will appear here once registered</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}