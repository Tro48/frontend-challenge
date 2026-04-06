import { LikeIcon } from '../LikeIcon/LikeIcon';
import styles from './CatCard.module.css';

export const CatCard = ({ src, id, loading }: { src: string; id: string, loading: boolean }) => {
  return (
    <div className={`${styles.catCard} ${loading ? 'skeleton' : ''}`}>
      <img className={styles.catImage} src={src} alt={`cat ${id}`} />
      <LikeIcon/>
    </div>
  );
};
