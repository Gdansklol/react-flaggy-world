import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Countries from './pages/Countries';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/countries'  element={<Countries />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
