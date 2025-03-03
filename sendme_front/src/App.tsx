import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Upload from './pages/Upload';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <header className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                send.me
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Partagez vos fichiers en toute simplicité
              </h2>
              <p className="text-lg md:text-xl font-light mb-8">
                Envoyez des fichiers rapidement et de manière sécurisée avec notre plateforme.
              </p>
              <a
                href="/Login"
                className="px-6 mr-2 py-3 bg-white text-indigo-600 font-medium text-lg rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
              >
                Connexions
              </a>
              <a
                href="/Register"
                className="px-6 py-3 bg-white text-indigo-600 font-medium text-lg rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
              >
                S'inscrire
              </a>
            </header>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        //<Route path="/upload" element={<Upload />} />

      </Routes>
    </Router>
  );
}

export default App;
