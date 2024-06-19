import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shops from './pages/Shops';
import Card from './pages/Card';
import Shipping from './pages/Shipping';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/card' element={<Card/>} />
        <Route path='/shipping' element={<Shipping/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App