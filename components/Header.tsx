
import React from 'react';
import type { ViewType } from '../App';

interface HeaderProps {
  setView: (view: ViewType) => void;
  currentView: ViewType;
}

const NavButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm md:text-base font-bold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400 ${
      isActive
        ? 'bg-cyan-500 text-white shadow-lg scale-105'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
    }`}
  >
    {children}
  </button>
);


const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm shadow-2xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setView('heroList')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-wider">
            WOD <span className="text-cyan-400">PULSE</span>
          </h1>
        </div>
        <nav className="flex space-x-2 md:space-x-4">
          <NavButton onClick={() => setView('heroList')} isActive={currentView === 'heroList' || currentView === 'wodDetail'}>
            히어로 와드
          </NavButton>
          <NavButton onClick={() => setView('customCreator')} isActive={currentView === 'customCreator'}>
            커스텀 와드
          </NavButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
