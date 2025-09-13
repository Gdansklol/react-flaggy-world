import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Navbar from './components/Navbar';
import CountryDetail from './pages/CountryDetail';
import Collection from './pages/Collection';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/countries'  element={<Countries />}/>
          <Route path='/countries/:countryName'  element={<CountryDetail />}/>
          <Route path='/collection'  element={<Collection />}/>
          <Route path='/quiz'  element={<Quiz/>}/>
          <Route path='/leaderboard'  element={<Leaderboard/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
