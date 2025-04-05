import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import PageLoader from "./components/PageLoader";


import AdminDashboard from './pages/AdminDashboard';



function App() {
    return (
        <Router>
            <PageLoader />
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route path="/" element={<AdminDashboard />} />
                        </Routes>
                    </div>
        </Router>
    );
}
  
export default App;
