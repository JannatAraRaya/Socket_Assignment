import { useEffect, useState } from 'react'
import './App.css'
import {io} from 'socket.io-client'
import SingleChat from './pages/ChatPage'
function App() {
  const socket = io("http://localhost:3000")

  return (
    <>
     {/* <MessagesPage/> */}
     <SingleChat/>
    </>
  )
}

export default App
