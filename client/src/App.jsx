import { useEffect, useState } from 'react'
import './App.css'
import {io} from 'socket.io-client'
import ChatComponent from './pages/Sender'
function App() {
  const socket = io("http://localhost:3000")

  return (
    <>
     
    </>
  )
}

export default App
