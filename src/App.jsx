import './styles/_normalize.scss';
import './styles/_reset.scss';
import './styles/main.scss';
import './styles/Dark.scss';
import Home from './components/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {
  const [themeChanger, setThemeChanger] = useState(false);

  function themeDarkHandle() {
    setThemeChanger(!themeChanger);
    window.localStorage.setItem('dark', !themeChanger);
  }

  useEffect(() => {
    const dark = JSON.parse(window.localStorage.getItem('dark'));
    setThemeChanger(dark);
  }, []);

  return (
    <div className={`App ${themeChanger ? 'dark' : ''}`}>
      <Header themeDarkHandle={themeDarkHandle} themeChanger={themeChanger} />
      <main className="AppBody">
        <Home />
      </main>
    </div>
  );
}

export default App;
