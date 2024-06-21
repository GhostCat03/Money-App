import logo from './logo.svg';
import './App.css';
import DataPage from './pages/data.tsx';
import Layout from './components/layout.tsx';

function App() {
  return (
    <div className="App">
      <Layout/>
      <DataPage/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          hello world
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
