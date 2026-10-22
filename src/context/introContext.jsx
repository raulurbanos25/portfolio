import { createContext, useContext } from 'react';

// ready = true cuando la intro ya se está abriendo (el hero puede animarse)
export const IntroContext = createContext({ ready: true });

export const useIntro = () => useContext(IntroContext);