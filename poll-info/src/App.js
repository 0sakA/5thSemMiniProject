import './styles.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PoliticianList from './components/PoliticianList';
import PoliticianProfile from './components/PoliticianProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PoliticianList />} />
        <Route path="/politician/:id" element={<PoliticianProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
