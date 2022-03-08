import { GlobalStateProvider } from './context/AppContext';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AllContacts from './components/AllContacts';
import Favorites from './components/Favorites';
import NewContactDisplay from './components/RecentlyDeleted';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/favorites' element={<Favorites/>} />
          <Route path='/contacts' element={<AllContacts/>} />
          <Route path='/add-new-contact' element={<NewContactDisplay/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <Footer />
      </ GlobalStateProvider>
    </div>
  );
}

export default App;
