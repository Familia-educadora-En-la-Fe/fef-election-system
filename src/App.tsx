import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {config} from "./config/config";
import Home from "./components/Home";
import './index.css'
import Login from "./components/Login";
import Dashboard from "./components/Dashbaord";
import AuthRoute from "./components/AuthRoute";

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin-login" element={<Login/>}/>
        <Route path="/dashboard" element={<AuthRoute><Dashboard/></AuthRoute>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
