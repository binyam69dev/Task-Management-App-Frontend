import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const TaskAnalytics = ({ tasks }) => {
  const statusData = [
    { name: 'Todo', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
    { name: 'Done', value: tasks.filter(t => t.status === 'done').length }
  ];

  const priorityData = [
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length }
  ];

  const weeklyData = [
    { day: 'Mon', tasks: Math.floor(Math.random() * 10) },
    { day: 'Tue', tasks: Math.floor(Math.random() * 10) },
    { day: 'Wed', tasks: Math.floor(Math.random() * 10) },
    { day: 'Thu', tasks: Math.floor(Math.random() * 10) },
    { day: 'Fri', tasks: Math.floor(Math.random() * 10) },
    { day: 'Sat', tasks: Math.floor(Math.random() * 5) },
    { day: 'Sun', tasks: Math.floor(Math.random() * 3) }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={statusData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
          <BarChart width={400} height={300} data={priorityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Task Trend</h3>
          <LineChart width={800} height={300} data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default TaskAnalytics;

