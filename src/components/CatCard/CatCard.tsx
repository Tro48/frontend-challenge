import { useState } from 'react';
import { LikeIcon } from '../LikeIcon/LikeIcon';
import styles from './CatCard.module.css';

export const CatCard = ({
  src,
  id,
  loading,
}: {
  src: string;
  id: string;
  loading?: boolean;
}) => {
  const [error, setError] = useState(false);
  return loading ? (
    <div className={`${styles.catCard} ${loading ? 'skeleton' : ''}`}></div>
  ) : (
    <div className={styles.catCard}>
      {error ? (
        <div className={styles.catImage}> no content </div>
      ) : (
        <img
          className={styles.catImage}
          src={src}
          alt={`cat ${id}`}
          onError={() => setError(true)}
        />
      )}
      {!error && <LikeIcon />}
    </div>
  );
};
