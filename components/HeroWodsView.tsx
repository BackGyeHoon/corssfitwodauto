
import React, { useState, useEffect } from 'react';
import { getHeroWodList } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface HeroWodsViewProps {
  onSelectWod: (wodName: string) => void;
}

const HeroWodsView: React.FC<HeroWodsViewProps> = ({ onSelectWod }) => {
  const [wodList, setWodList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWods = async () => {
      try {
        setLoading(true);
        setError(null);
        const wods = await getHeroWodList();
        setWodList(wods);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchWods();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <LoadingSpinner />
        <p className="mt-4 text-cyan-300">히어로 와드 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        히어로 와드
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wodList.map((wodName) => (
          <button
            key={wodName}
            onClick={() => onSelectWod(wodName)}
            className="group relative bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <p className="relative z-10 text-center font-bold text-lg text-white">
              {wodName}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroWodsView;
