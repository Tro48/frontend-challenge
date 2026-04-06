
import styles from "./CatsList.module.css";
export const CatsList = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.catsList}>{children}</ul>;
};
