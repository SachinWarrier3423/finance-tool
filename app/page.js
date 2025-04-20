"use client"

import { useState } from 'react';

import Sidebar from './components/SideBar';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} handleSidebarToggle={handleSidebarToggle} />
      
      {/* Main Content */}
      <div className={`ml-${isSidebarCollapsed ? '16' : '64'} transition-all duration-300 p-6`}>
        <h1 className="text-4xl font-bold text-black">Welcome to Freelancer Planner</h1>
        {/* Add dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;
