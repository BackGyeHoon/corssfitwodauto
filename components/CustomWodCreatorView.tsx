
import React, { useState } from 'react';
import { createCustomWod } from '../services/geminiService';
import type { CustomWodPreferences, CustomWOD } from '../types';
import LoadingSpinner from './LoadingSpinner';

const CustomWodCreatorView: React.FC = () => {
    const [preferences, setPreferences] = useState<CustomWodPreferences>({
        type: 'AMRAP',
        duration: '20분',
        focus: '전신',
    });
    const [generatedWod, setGeneratedWod] = useState<CustomWOD | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = <K extends keyof CustomWodPreferences,>(key: K, value: CustomWodPreferences[K]) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setGeneratedWod(null);
        try {
            const wod = await createCustomWod(preferences);
            setGeneratedWod(wod);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                나만의 와드 만들기
            </h2>
            <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-2xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="type" className="block text-sm font-bold text-cyan-300 mb-2">운동 종류</label>
                        <select
                            id="type"
                            value={preferences.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:ring-0 transition"
                        >
                            <option>AMRAP</option>
                            <option>For Time</option>
                            <option>EMOM</option>
                            <option>Tabata</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="duration" className="block text-sm font-bold text-cyan-300 mb-2">소요 시간</label>
                        <input
                            type="text"
                            id="duration"
                            value={preferences.duration}
                            onChange={(e) => handleInputChange('duration', e.target.value)}
                            className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:ring-0 transition"
                            placeholder="예: 20분, 10 라운드"
                        />
                    </div>
                </div>
                 <div>
                    <label htmlFor="focus" className="block text-sm font-bold text-cyan-300 mb-2">중점 부위</label>
                    <input
                        type="text"
                        id="focus"
                        value={preferences.focus}
                        onChange={(e) => handleInputChange('focus', e.target.value)}
                        className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:ring-0 transition"
                        placeholder="예: 하체, 상체, 유산소, 전신"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? <LoadingSpinner size="sm" /> : 'AI 와드 생성하기'}
                </button>
            </form>

            {error && <div className="mt-6 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

            {generatedWod && (
                <div className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-inner shadow-black/30 animate-fade-in">
                    <h3 className="text-2xl font-bold mb-4 text-center text-cyan-400">{generatedWod.name}</h3>
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{generatedWod.description}</p>
                </div>
            )}
        </div>
    );
};

export default CustomWodCreatorView;
