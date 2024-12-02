import { JudgeFeedback } from '../types';
import { dummyRoasts } from '../data/dummyRoasts';

const ROASTING_API_URL = 'https://3150c2bddc611e506cd826b927e56f82.serveo.net/roast';
const API_TIMEOUT = 60000; // 60 seconds

const LOADING_MESSAGES = [
  "🎭 Our AI judges are watching your performance...",
  "🤔 The panel is deliberating...",
  "🎬 Analyzing your star potential...",
  "🎯 Preparing some spicy feedback...",
  "🎪 The judges are sharpening their wit...",
  "🎤 Getting the tough crowd warmed up..."
];

export const getRandomLoadingMessage = () => {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
};

const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const submitVideoForRoasting = async (videoUrl: string): Promise<JudgeFeedback[]> => {
  try {
    console.log('Submitting video for roasting:', videoUrl);

    const response = await fetchWithTimeout(
      ROASTING_API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          transcript: '',
          videoUrl
        })
      },
      API_TIMEOUT
    );

    if (!response.ok) {
      console.warn(`API response not ok (${response.status}): ${response.statusText}`);
      return dummyRoasts;
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn('Invalid API response format, using fallback roasts');
      return dummyRoasts;
    }

    return data.map((judge: any) => ({
      panel: judge.panel,
      roast: judge.roast,
      audioUrl: judge.audioUrl,
      thumbnail: judge.thumbnail
    }));
  } catch (error) {
    console.warn('Error fetching roasts, using fallback:', error);
    return dummyRoasts;
  }
};