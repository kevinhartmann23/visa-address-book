import { GlobalStateProvider } from './context/AppContext';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AllContacts from './components/AllContacts';
import NewContactDisplay from './components/NewContactDisplay';
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
          <Route path='/favorites' element={<AllContacts title='Favorites' />} />
          <Route path='/contacts' element={<AllContacts title='All Contacts'/>} />
          <Route path='/add-new-contact' element={<NewContactDisplay/>} />
          <Route path='/contacts/:id' element={<NewContactDisplay />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <Footer />
      </ GlobalStateProvider>
    </div>
  );
}

export default App;
