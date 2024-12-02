import React from 'react';
import { Home, Upload, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navigation() {
  const { activeTab, setActiveTab } = useStore();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'upload', icon: Upload, label: 'Upload' },
    { id: 'earnings', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4 safe-area-inset-bottom">
        <div className="flex justify-around">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center py-3 px-5 ${
                activeTab === id
                  ? 'text-purple-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}