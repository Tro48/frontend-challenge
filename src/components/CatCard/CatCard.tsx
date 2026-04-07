import { useState } from 'react';
import { LikeIcon } from '../LikeIcon/LikeIcon';
import styles from './CatCard.module.css';
import { type CatCardProps } from '../../hooks/useFavorites';

export const CatCard = ({ src, cardId, isFavorite, onAddFavorite, onRemoveFavorite }: CatCardProps) => {
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
          src="./src/assets/noImg.png"
          alt="Ошибка загрузки картинки"
        />
      ) : (
        <>
          <img
            className={styles.catImage}
            src={src}
            alt={`cat ${cardId}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
          <div className={styles.hoverEffect}></div>
          {!isLoading && !error && <LikeIcon cardId={cardId} src={src} isFavorite={isFavorite} onAddFavorite={onAddFavorite} onRemoveFavorite={onRemoveFavorite} />}
        </>
      )}
    </div>
  );
};
