import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Navbar from './components/Navbar';
import CountryDetail from './pages/CountryDetail';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/countries'  element={<Countries />}/>
          <Route path='/countries'  element={<Countries />}/>
          <Route path='/countries/:countryName'  element={<CountryDetail />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
