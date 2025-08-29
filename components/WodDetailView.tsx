
import React, { useState, useEffect } from 'react';
import { getHeroWodDetails } from '../services/geminiService';
import { HeroWOD } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface WodDetailViewProps {
  wodName: string;
  onBack: () => void;
}

const WodDetailView: React.FC<WodDetailViewProps> = ({ wodName, onBack }) => {
  const [wodDetails, setWodDetails] = useState<HeroWOD | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!wodName) return;
      try {
        setLoading(true);
        setError(null);
        setWodDetails(null);
        const details = await getHeroWodDetails(wodName);
        setWodDetails(details);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [wodName]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <LoadingSpinner />
          <p className="mt-4 text-cyan-300">'{wodName}' 정보를 불러오는 중...</p>
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>;
    }

    if (!wodDetails) {
      return <div className="text-center text-gray-400">와드 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-inner shadow-black/30">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">운동 설명</h3>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{wodDetails.description}</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-inner shadow-black/30">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">스토리</h3>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{wodDetails.story}</p>
            </div>
        </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <button
            onClick={onBack}
            className="mb-8 flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>목록으로 돌아가기</span>
        </button>
        <h2 className="text-4xl font-black text-center mb-8 text-white">{wodDetails?.name || wodName}</h2>
        {renderContent()}
    </div>
  );
};

export default WodDetailView;
