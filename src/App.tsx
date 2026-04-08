import { useState } from 'react';
import { Tabs } from './components/Tabs';
import styles from './pageStyles/App.module.css';
import { CatsPage } from './components/CatsPage';
import { FavoritePage } from './components/FavoritePage';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>
      <main className={styles.appContent}>
        {activeTab === 'all' ? <CatsPage /> : <FavoritePage />}
      </main>
    </div>
  );
}

export default App;
