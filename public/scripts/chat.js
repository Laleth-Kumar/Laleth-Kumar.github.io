
import { socket } from "./index.js";
const CHAT_REFS = {
    output: document.querySelector(".output"),
    feedback: document.querySelector(".feedback"),
    message: document.querySelector(".message"),
    send: document.querySelector(".send")
}

(function (){
    CHAT_REFS.message.addEventListener("keypress", giveFeedback);
    CHAT_REFS.send.addEventListener("click", sendMessage);
})();


function giveFeedback(){
    socket.emit('typing',userName)
}

function sendMessage(){
    socket.emit('message',{
        userName,
        message: message.value
    })
    message.value = '';
}

socket.on('newuser',function(data){
    CHAT_REFS.feedback.innerHTML = '';
    output.innerHTML += `<p> <strong>` + data + `joined</strong> </p>`; 
})

socket.on('typing', function(data){
    CHAT_REFS.feedback.innerHTML = `<p>  <em>`+ data + `is typing...</em></p>`;
})

socket.on('message', function(data){
    CHAT_REFS.feedback.innerHTML = '';
    CHAT_REFS.output.innerHTML += `<p> <strong>` + data.userName + `:</strong>`+ data.message + `</p>`;
})