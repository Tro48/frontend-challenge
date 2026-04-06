import { useState } from 'react';
import { Tabs } from './components/Tabs';
import './pageStyles/App.css';
import { CatsPage } from './components/CatsPage';
import { FavoritePage } from './components/FavoritePage';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  return (
    <div className="App">
      <header className="header">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>
      <main className='app-content'>
        {activeTab === 'all' ? <CatsPage /> : <FavoritePage />}
      </main>
    </div>
  );
}

export default App;
