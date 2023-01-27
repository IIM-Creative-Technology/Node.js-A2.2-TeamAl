const btn = document.getElementById("btn");
const ul = document.getElementById("ul");
const btnSocket = document.getElementById("btnSocket");

//##############

const form = document.getElementById('msg-form')
const input = document.getElementById("message")

form.addEventListener('submit', (e)=>{
  e.preventDefault()
})

if(input.value){
  socket.emit('message', input.value)
  input.value = ''
}

socket.on("mssage", function(msg){
  const li = document.createElement('li')
  li.innerText = msg
  ul.appendChild(li)
  window.scrollTo(0, document.body.scrollHeight)
})
//################
btn.addEventListener("click", () => {
  fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify({
      school: "IIM",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((d) => {
      return d.json();
    })
    .then((dd) => {
      console.log(dd);
      const li = document.createElement("li");
      li.innerHTML = dd.school;
      ul.append(li);
    })
    .catch(
      (err) => {
        console.log(err);
      }

      //   .then((res) => res.json())
      //   .then((data) => console.log(data))
      //   .catch((err) => console.log(err));
    );
});
const socket = io("http://localhost:3000");

btnSocket.addEventListener("click", () => {
  socket.emit("message", {
    msg: "Hi 👋",
  });
  socket.on("data", (data) => {
    console.log((data));
  });
});
