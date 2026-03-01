import { useState, useCallback } from 'react';
import { useSettingsStore } from '../store';

interface VoiceInputOptions {
  onTextEntry?: (text: string) => void;
}

export function useVoiceInput(options?: VoiceInputOptions) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { language } = useSettingsStore();

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language || 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
      if (options?.onTextEntry && event.results[event.results.length - 1].isFinal) {
        options.onTextEntry(event.results[event.results.length - 1][0].transcript);
      }
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [SpeechRecognition, language]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    isSupported: !!SpeechRecognition
  };
}
