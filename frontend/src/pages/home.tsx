import Helmet from '../components/helmet';
import Container from '../components/container';

const Home = () => {
  return (
    <Helmet title="Home">
      <Container>
        <main className="home-page">Home page</main>
      </Container>
    </Helmet>
  );
};

export default Home;
