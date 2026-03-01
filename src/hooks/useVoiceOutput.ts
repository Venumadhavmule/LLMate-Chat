import { useCallback, useState } from 'react';
import { useSettingsStore } from '../store';

export function useVoiceOutput() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { voiceId, enableSounds } = useSettingsStore();

  const speak = useCallback((text: string) => {
    if (!enableSounds || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Clean markdown manually or just let it speak
    const cleanText = text.replace(/[#*`_]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    if (voiceId) {
      const selectedVoice = voices.find(v => v.voiceURI === voiceId);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [enableSounds, voiceId]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking };
}
