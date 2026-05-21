import { useState } from 'react'
import { Routes, Route } from 'react-router';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={ <LoginPage /> } />
      </Routes>
    </>
  )
}

export default App
