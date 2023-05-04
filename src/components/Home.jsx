import '../styles/Home.scss';
import Tasks from './Tasks/Tasks';
import Bg from '../assets/home-bg.jpg';

const Home = () => {
  return (
    <section className="home" style={{ backgroundImage: `url(${Bg})` }}>
      <Tasks />
    </section>
  );
};

export default Home;
