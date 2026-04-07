import styles from './NoContent.module.css';
import img from '../../assets/nocontent.png';
export const NoContent = () => {
  return (
    <div className={styles.noContent}>
      <img
        className={styles.noContentImg}
        src={img}
        alt="Тут пока ничего нет"
      />
      Тут пока ничего нет
    </div>
  );
};
