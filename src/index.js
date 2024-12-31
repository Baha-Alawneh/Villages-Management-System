import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Overview from './overview';
import Dashboard from './dashboard';
import './struct.css';
import VillageManagement from './villageManagement'
const stats = {
  villageCount: 8,
  urbanCount: 3,
  populationSize: 660000,
  landArea: 11.88
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='structure'>
    <Dashboard />
    <Overview stats={stats} />
    <VillageManagement />
    </div>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
