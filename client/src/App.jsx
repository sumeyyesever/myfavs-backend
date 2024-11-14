import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Write from './pages/write/Write'
import Home from './pages/home/Home';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </Router>
  )
}

export default App
