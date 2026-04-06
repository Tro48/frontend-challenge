import styles from './Tabs.module.css';

export const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'all' | 'favorites';
  setActiveTab: (tab: 'all' | 'favorites') => void;
}) => {
  return (
    <nav className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
        onClick={() => setActiveTab('all')}
      >
        Все котики
      </button>
      <button
        className={
          `${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`
        }
        onClick={() => setActiveTab('favorites')}
      >
        Любимые котики
      </button>
    </nav>
  );
};
