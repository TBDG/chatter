import React, {useState} from 'react';
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:4000")

const App: React.FC = () => {
    const [handle, setHandle] = useState('')
    const [message, setMessage] = useState('')
    const [feedback, setFeedback] = useState('')
    const [output, setOutput] = useState([])

    socket.on('chat', (data:any)=> {
        setFeedback('')
        setOutput(output.concat(data))
        console.log(data, 'data')
    })

    socket.on('typing', (data:string) => {
        setFeedback(`${data} is typing a message...`)
    })

    function addChat() {
        socket.emit('chat', {
            message,
            handle
        })
    }

    return (

        <div className="App">
            <div id="chat">
                <div id="chat-window">
                    <div id="output">{output.map((e:any)=><p>{e.handle}: {e.message}</p>)}</div>
                    <div id="feedback"><p>{feedback}</p></div>
                </div>
                <input id="handle"
                       type="text"
                       placeholder="name"
                       value={handle}
                       onChange={(e) => setHandle(e.target.value)}/>
                <input id="message"
                       type="text"
                       value={message}
                       placeholder="message"
                       onKeyPress={()=> {
                           socket.emit('typing', handle)
                       }}
                       onChange={(e) => setMessage(e.target.value)}/>
                <button id="send"
                        onClick={() => addChat()}
                        >Send
                </button>
            </div>
        </div>
    );
}

export default App;
