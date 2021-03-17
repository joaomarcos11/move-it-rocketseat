import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/54403676?s=460&u=295a01ef20c75c020ef727e683e80fb537d7eefa&v=4" alt="João Marcos"/>
      
      <div>
        <strong>João Marcos</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>

    </div>
  );
}