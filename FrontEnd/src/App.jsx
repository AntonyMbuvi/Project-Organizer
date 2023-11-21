import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Form from './form';
import Update from './update';
import Category from './category';
import './App.css'
function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
