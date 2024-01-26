import React from 'react'
import {io} from 'socket.io-client'
function Reciever() {
    const socket = io("http://localhost:3000")
    useEffect(()=>{
      socket.io("connect",()=>{
        console.log("connected",socket.id)
      })
    },[])
  return (
    <div>Reciever</div>
  )
}

export default Reciever