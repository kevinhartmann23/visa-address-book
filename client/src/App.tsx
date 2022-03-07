import { GlobalStateProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Header />
        <Footer />
      </ GlobalStateProvider>
    </div>
  );
}

export default App;
