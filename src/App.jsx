import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header'; 

import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';
import PostCreatePage from './pages/PostCreatePage';
import PostDetailPage from './pages/PostDetailPage';
import PostEditPage from './pages/PostEditPage';
import MessageWritePage from './pages/MessageWritePage';

function App() {
  return (
    <BrowserRouter>
  
      <Header /> 
      
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/post" element={<PostCreatePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/:id/edit" element={<PostEditPage />} />
        <Route path="/post/:id/message" element={<MessageWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;