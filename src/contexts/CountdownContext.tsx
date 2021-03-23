import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

// interface vai conter os dados que vai retornar do Context
interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

// tipagem global => declara pra saber o tipo
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
      }
    
      function resetCountdown() {
        // pra evitar um delay de 1seg
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        // setTime(25 * 60);
        setTime(0.1 * 60);
      }
    
      useEffect(() => {
        if(isActive && time > 0) {
          countdownTimeout = setTimeout(() => {
            setTime(time - 1);
          }, 1000);
        } else if(isActive && time === 0) {
          setHasFinished(true);
          setIsActive(false);
          startNewChallenge();
        }
      }, [isActive, time])
      // ao colocar o time no array de dependencias, 
      // toda vez que o time mudar, useEffect entra em ação
    

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}