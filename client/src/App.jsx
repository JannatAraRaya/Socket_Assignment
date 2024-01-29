import { useEffect, useState } from 'react'
import './App.css'
import {io} from 'socket.io-client'
import MessagesPage from './pages/MessagesPage'
function App() {
  const socket = io("http://localhost:3000")

  return (
    <>
     <MessagesPage/>
    </>
  )
}

export default App
