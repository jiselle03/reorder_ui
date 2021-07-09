import Container from 'react-bootstrap/Container';
import List from './components/List';

const App = () => {
  return (
    <Container>
      <header>
        <h1>List App</h1>
      </header>

      <List />
    </Container>
  );
}

export default App;
