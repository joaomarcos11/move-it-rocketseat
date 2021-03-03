import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

// tipagem global => declara pra saber o tipo
let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  // se tiver '5', torna '05' => no split: '0' '5'
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    // pra evitar um delay de 1seg
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if(isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }

  }, [isActive, time])
  // ao colocar o time no array de dependencias, 
  // toda vez que o time mudar, useEffect entra em ação

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {/* mesmo que um ternário, mas sem else */}
      {/* { hasFinished && (
        <p>Terminou...</p>
      )} */}

      { hasFinished ? (
        <button 
            disabled={true}
            className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>

        ) : (
        <>
          { isActive ? (
            <button 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Inicie um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
