import '../styles/Footer.scss';
import LogoHugo from '../assets/hugocodes-light.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <a
          href="https://hugocodesbr.github.io/hugocodes-portfolio/"
          target="_blank"
        >
          <img src={LogoHugo} alt="Logo hugocodes" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
