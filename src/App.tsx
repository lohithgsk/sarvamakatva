import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Stakeholders } from './pages/Stakeholders';
import { Programs } from './pages/Programs';
import { Reports } from './pages/Reports';
import { Auth } from './pages/Auth';
import { useAuth } from './lib/store';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stakeholders" element={<Stakeholders />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;