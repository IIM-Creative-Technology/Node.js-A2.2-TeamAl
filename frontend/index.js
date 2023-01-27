const socket = io("http://localhost:3000");
const btn = document.getElementById("btn");

const send = () => {
  const text = document.getElementById("message").value;
  socket.emit("chat message", text);
};

const receive =  () => {
  const li = document.createElement("li");
  li.innerText = msg;
  document.getElementById("messages").appendChild(li);
};
socket.on("chat message", receive);

btn.addEventListener("click", send);
