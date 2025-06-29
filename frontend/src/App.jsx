import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>ShopList Lite 🛒</h1>
      <p>Welcome to the frontend of your DevOps-enabled product catalog!</p>
    </div>
  )
}

export default App
