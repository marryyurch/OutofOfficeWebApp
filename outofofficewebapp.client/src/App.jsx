import { } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Home from './Pages/Home.jsx';
import Start from './Pages/Start.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import RegisterHR from './Pages/RegisterHR.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/registerHR" element={<RegisterHR />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
