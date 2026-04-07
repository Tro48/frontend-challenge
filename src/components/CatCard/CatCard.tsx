import { useState } from 'react';
import { LikeIcon } from '../LikeIcon/LikeIcon';
import styles from './CatCard.module.css';

export const CatCard = ({ src, id }: { src: string; id: string }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className={`${styles.catCard} ${isLoading ? 'skeleton' : ''}`}>
      {isLoading && <div className={styles.skeletonLoader}></div>}
      {error ? (
        <img
          className={`${styles.catImage} ${styles.errorImage}`}
          src="./src/assets/errorIcon.png"
          alt="Ошибка загрузки картинки"
        />
      ) : (
        <>
          <img
            className={styles.catImage}
            src={src}
            alt={`cat ${id}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
          <div className={styles.hoverEffect}></div>
          {!isLoading && !error && <LikeIcon />}
        </>
      )}
    </div>
  );
};
