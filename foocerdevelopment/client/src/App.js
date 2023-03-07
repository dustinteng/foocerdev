import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
// import style
import styles from "./styles.css";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

const socket = io.connect("http://localhost:3001");

function App() {
  // constants
  const initialSeconds = 10;
  // Room State
  const [room, setRoom] = useState("");

  // Message State
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  // Window State
  const [window, setWindow] = useState("home");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const togglePage = () => {
    setWindow(!window);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Message"
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>

      <input
        placeholder="Room"
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <h1>Message:</h1>
      {messageReceived}

      <div>
        <button onClick={togglePage}> Button Page </button>
        {window ? <Timer duration={initialSeconds} /> : <Stopwatch />}
      </div>
    </div>
  );
}

export default App;
