import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import auth from './auth';
import Dashboard from './components/dashboard';

const App: React.FC = () => {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState);

  return (
    <div className="App">
      <Router>
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </div>
  );
}

export default App;
