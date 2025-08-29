
import { GoogleGenAI, Type } from "@google/genai";
import { CustomWodPreferences, HeroWOD, CustomWOD } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getHeroWodList = async (): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: '크로스핏의 유명한 히어로 와드(Hero WOD) 20개의 이름을 쉼표로만 구분된 목록으로 알려줘. 다른 설명 없이 이름만 나열해줘. 예: Murph, Fran, Cindy',
    });
    const text = response.text;
    return text.split(',').map(name => name.trim());
  } catch (error) {
    console.error("Error fetching hero WOD list:", error);
    throw new Error("히어로 와드 목록을 가져오는 데 실패했습니다.");
  }
};

export const getHeroWodDetails = async (wodName: string): Promise<HeroWOD> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `"${wodName}" 크로스핏 히어로 와드에 대해 설명해줘.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: '와드 이름' },
            description: { type: Type.STRING, description: '운동 동작, 라운드, 반복 횟수 등을 포함한 상세한 운동 설명' },
            story: { type: Type.STRING, description: '와드의 유래와 이 와드가 기리는 인물에 대한 감동적인 이야기' },
          },
          required: ['name', 'description', 'story'],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as HeroWOD;
  } catch (error) {
    console.error(`Error fetching details for ${wodName}:`, error);
    throw new Error(`'${wodName}' 와드 정보를 가져오는 데 실패했습니다.`);
  }
};


export const createCustomWod = async (preferences: CustomWodPreferences): Promise<CustomWOD> => {
    try {
        const prompt = `사용자 선호도에 따라 크로스핏 커스텀 와드를 생성해줘: 운동 종류: ${preferences.type}, 총 소요 시간: ${preferences.duration}, 중점 운동 부위: ${preferences.focus}. 결과는 다음 JSON 형식으로 제공해줘:`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: {
                            type: Type.STRING,
                            description: '생성된 와드의 창의적인 이름'
                        },
                        description: {
                            type: Type.STRING,
                            description: '운동 동작, 반복 횟수, 라운드 등을 포함한 상세한 운동 설명'
                        }
                    },
                    required: ['name', 'description']
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as CustomWOD;

    } catch (error) {
        console.error("Error creating custom WOD:", error);
        throw new Error("커스텀 와드를 생성하는 데 실패했습니다.");
    }
};
