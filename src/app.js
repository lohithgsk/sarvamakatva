// Update to src/App.js or your main routing file
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Stakeholders from './components/Stakeholders';
import Programs from './components/Programs';
import ReportsDashboard from './components/reports/ReportsDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import other components

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/stakeholders" component={Stakeholders} />
            <Route path="/programs" component={Programs} />
            <Route path="/reports" component={ReportsDashboard} />
            {/* Other routes */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;