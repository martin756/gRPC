import React, { useState } from 'react'
import SockJsClient from 'react-stomp'

function Subasta() {
    const [mensajes, setMessage] = useState([])
    const SOCKET_URL = "http://localhost:8080/mensajes"

    let onConnected = () => {
        console.log("Conectado al websocket")
    }

    let onMessageReceived = (msg) => {
        console.log(msg)
        setMessage(mensajes.concat(msg))
    }

  return (
    <div>
        <SockJsClient 
        url={SOCKET_URL}
        topics={['/topic/mensaje']}
        onConnect={onConnected}
        onDisconnect={console.log("Desconectado!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
        />
        {mensajes.map((item, index)=>(
            <div>{JSON.stringify(item)}</div>
        ))}
    </div>
  )
}

export default Subasta