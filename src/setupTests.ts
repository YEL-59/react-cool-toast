import '@testing-library/jest-dom';

// Mock matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock AudioContext for tests
global.AudioContext = jest.fn().mockImplementation(() => ({
    createOscillator: jest.fn(() => ({
        connect: jest.fn(),
        frequency: { setValueAtTime: jest.fn() },
        type: 'sine',
        start: jest.fn(),
        stop: jest.fn(),
    })),
    createGain: jest.fn(() => ({
        connect: jest.fn(),
        gain: {
            setValueAtTime: jest.fn(),
            linearRampToValueAtTime: jest.fn(),
        },
    })),
    destination: {},
    currentTime: 0,
})) as any;