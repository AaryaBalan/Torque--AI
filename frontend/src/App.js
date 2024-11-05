import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Dataset from './pages/Dataset'
import Create from './pages/Create';
import TextData from './pages/TextData';
import Csv from './pages/Csv';
import SingleCsv from './pages/SingleCsv';
import TryDemo from './pages/TryDemo';
import MoreInfo from './pages/MoreInfo';

const App = () => {
  const [textData, setTextData] = useState({})
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TryDemo />} />
        <Route path='/data' element={<Dataset setSingleData={setTextData} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/moreInfo' element={<MoreInfo />} />
        <Route path='/data/create' element={<Create />} />
        <Route path='/data/csv' element={<Csv />} />
        <Route path='/csvData/*' element={<SingleCsv />} />
        <Route path='/data/*' element={<TextData singleData={textData} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App