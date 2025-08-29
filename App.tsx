
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import HeroWodsView from './components/HeroWodsView';
import WodDetailView from './components/WodDetailView';
import CustomWodCreatorView from './components/CustomWodCreatorView';

export type ViewType = 'heroList' | 'wodDetail' | 'customCreator';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('heroList');
  const [selectedWod, setSelectedWod] = useState<string | null>(null);

  const handleSelectWod = useCallback((wodName: string) => {
    setSelectedWod(wodName);
    setView('wodDetail');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedWod(null);
    setView('heroList');
  }, []);
  
  const renderContent = () => {
    switch (view) {
      case 'heroList':
        return <HeroWodsView onSelectWod={handleSelectWod} />;
      case 'wodDetail':
        return selectedWod ? <WodDetailView wodName={selectedWod} onBack={handleBack} /> : <HeroWodsView onSelectWod={handleSelectWod} />;
      case 'customCreator':
        return <CustomWodCreatorView />;
      default:
        return <HeroWodsView onSelectWod={handleSelectWod} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <Header setView={setView} currentView={view} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>CrossFit WOD Platform with Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
