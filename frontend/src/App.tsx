import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:blogId" element={<BlogDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
