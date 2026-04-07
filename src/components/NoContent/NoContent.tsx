import styles from './NoContent.module.css';
export const NoContent = () => {
  return (
    <div className={styles.noContent}>
      <img
        className={styles.noContentImg}
        src="./src/assets/nocontent.png"
        alt="Тут пока ничего нет"
      />
      Тут пока ничего нет
    </div>
  );
};
