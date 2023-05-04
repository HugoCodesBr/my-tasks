import '../styles/Header.scss';
import Logo from '../assets/logo-todo.png';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ themeDarkHandle, themeChanger }) => {
  return (
    <header className="header">
      <nav>
        <a href="#" className="header__logo">
          <img src={Logo} alt="" />
        </a>
        <div className="theme-changer" onClick={themeDarkHandle}>
          {themeChanger ? <FaSun /> : <FaMoon />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
