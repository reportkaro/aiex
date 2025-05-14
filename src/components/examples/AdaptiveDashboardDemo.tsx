import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define types for our dashboard items and usage data
interface DashboardItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  usage: number; // Number representing how frequently this is used
}

// Demo dashboard items with initial usage values
const initialDashboardItems: DashboardItem[] = [
  {
    id: 'analytics',
    title: 'Analytics',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    ),
    content: <div className="h-48 bg-blue-50 rounded-md p-4">Analytics content goes here</div>,
    usage: 3
  },
  {
    id: 'messages',
    title: 'Messages',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
      </svg>
    ),
    content: <div className="h-48 bg-green-50 rounded-md p-4">Messages content goes here</div>,
    usage: 8
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    ),
    content: <div className="h-48 bg-yellow-50 rounded-md p-4">Calendar content goes here</div>,
    usage: 5
  },
  {
    id: 'tasks',
    title: 'Tasks',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
    content: <div className="h-48 bg-purple-50 rounded-md p-4">Tasks content goes here</div>,
    usage: 10
  },
  {
    id: 'files',
    title: 'Files',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
    ),
    content: <div className="h-48 bg-pink-50 rounded-md p-4">Files content goes here</div>,
    usage: 2
  },
];

export default function AdaptiveDashboardDemo() {
  // State for the dashboard items with their usage statistics
  const [dashboardItems, setDashboardItems] = useState(initialDashboardItems);
  
  // State for the active tab
  const [activeTab, setActiveTab] = useState(dashboardItems[0].id);
  
  // User preference for auto-arrange
  const [autoArrange, setAutoArrange] = useState(true);
  
  // Layout preference (grid or list)
  const [layoutType, setLayoutType] = useState<'grid' | 'list'>('grid');
  
  // Update usage when a tab is clicked
  const handleTabClick = (itemId: string) => {
    setActiveTab(itemId);
    
    // Update usage statistics
    setDashboardItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, usage: item.usage + 1 } 
          : item
      )
    );
  };
  
  // Re-arrange items based on usage statistics when autoArrange is true
  useEffect(() => {
    if (autoArrange) {
      const sortedItems = [...dashboardItems].sort((a, b) => b.usage - a.usage);
      setDashboardItems(sortedItems);
    }
  }, [dashboardItems.map(item => item.usage).join(','), autoArrange]);
  
  // Reset usage statistics
  const resetUsage = () => {
    setDashboardItems(prev => 
      prev.map(item => ({ ...item, usage: 0 }))
    );
  };
  
  // Toggle auto-arrange
  const toggleAutoArrange = () => {
    setAutoArrange(prev => !prev);
  };
  
  // Toggle layout type
  const toggleLayout = () => {
    setLayoutType(prev => prev === 'grid' ? 'list' : 'grid');
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Dashboard controls */}
      <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Your Dashboard
        </h2>
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="auto-arrange" className="flex items-center cursor-pointer text-sm text-gray-600">
              <span className="mr-2">Auto-arrange by usage</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="auto-arrange" 
                  className="sr-only" 
                  checked={autoArrange} 
                  onChange={toggleAutoArrange}
                />
                <div className={`block w-10 h-6 rounded-full ${autoArrange ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${autoArrange ? 'transform translate-x-4' : ''}`}></div>
              </div>
            </label>
          </div>
          <button 
            className="text-sm text-gray-500 hover:text-gray-700 transition flex items-center"
            onClick={toggleLayout}
          >
            {layoutType === 'grid' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            )}
            <span>{layoutType === 'grid' ? 'List View' : 'Grid View'}</span>
          </button>
          <button 
            className="text-sm text-gray-500 hover:text-gray-700 transition flex items-center"
            onClick={resetUsage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Reset Usage
          </button>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="bg-gray-100 px-2 pt-2">
        <div className="flex flex-wrap -mb-px">
          {dashboardItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`relative inline-flex items-center px-4 py-2 border-b-2 font-medium text-sm leading-5 transition ${
                activeTab === item.id
                  ? 'border-blue-500 text-blue-600 focus:outline-none'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
              {autoArrange && (
                <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-1 rounded">
                  {item.usage}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Active content */}
      <div className="p-4">
        {dashboardItems.find(item => item.id === activeTab)?.content}
      </div>
      
      {/* Adaptive recommendations section */}
      <div className="border-t border-gray-200 p-4 bg-blue-50">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended for You</h3>
        <div className={`grid ${layoutType === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-3`}>
          {dashboardItems
            .sort((a, b) => b.usage - a.usage)
            .slice(0, 3)
            .map(item => (
              <button
                key={`rec-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`p-3 bg-white rounded-md shadow-sm border border-gray-200 
                  hover:bg-gray-50 transition flex ${
                    layoutType === 'grid' ? 'flex-col items-center' : 'items-center'
                  }`}
              >
                <div className={`${layoutType === 'grid' ? 'mb-2' : 'mr-3'} text-blue-500`}>
                  {item.icon}
                </div>
                <span className="text-gray-700">{item.title}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
} 