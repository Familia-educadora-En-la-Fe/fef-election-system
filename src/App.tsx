import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {config} from "./config/config";
import Home from "./components/Home";
import './index.css'

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/fef-election-system/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
