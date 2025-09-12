import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/countries'  element={<Countries />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
