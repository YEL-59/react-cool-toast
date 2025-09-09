import { ToastSound } from './types';

// Sound frequencies for different toast types
const soundFrequencies = {
    success: [523.25, 659.25, 783.99], // C5, E5, G5 - Major chord
    error: [220, 174.61], // A3, F3 - Dissonant
    warning: [440, 554.37], // A4, C#5 - Attention grabbing
    info: [523.25, 698.46], // C5, F5 - Neutral
    loading: [523.25, 659.25], // C5, E5 - Gentle progression
    notification: [659.25, 523.25], // E5, C5 - Pleasant
    none: []
};

// Audio context for Web Audio API
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;

    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported');
            return null;
        }
    }
    return audioContext;
};

// Play a tone with given frequency and duration
const playTone = (frequency: number, duration: number, volume: number = 0.1): void => {
    const context = getAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
};

// Play sound sequence for different toast types
export const playToastSound = (sound: ToastSound | boolean): void => {
    if (sound === false || sound === 'none') return;

    let soundType: ToastSound = 'notification';
    if (typeof sound === 'string') {
        soundType = sound;
    }

    const frequencies = soundFrequencies[soundType];
    if (!frequencies || frequencies.length === 0) return;

    frequencies.forEach((frequency, index) => {
        setTimeout(() => {
            playTone(frequency, 0.15, 0.05);
        }, index * 100);
    });
};

// Check if user has enabled sounds in their preferences
export const shouldPlaySound = (enableSounds: boolean = true): boolean => {
    if (!enableSounds) return false;

    // Check if user has reduced motion preference (often correlates with sound preference)
    if (typeof window !== 'undefined' && window.matchMedia) {
        try {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return false;
        } catch (error) {
            // Ignore errors in test environment
            console.warn('matchMedia not supported');
        }
    }

    return true;
};
