const URL = "http://localhost:8080";
const CHAT_REFS = {
    output: document.querySelector(".output"),
    feedback: document.querySelector(".feedback"),
    message: document.querySelector(".message"),
    send: document.querySelector(".send")
}
const QUERY = new URLSearchParams(location.search);
const USERNAME = QUERY.get("user-name");
const SOCKET = io.connect(URL);

(function (){
    SOCKET.emit('newuser', USERNAME);
    CHAT_REFS.message.addEventListener("keypress", giveFeedback);
    CHAT_REFS.send.addEventListener("click", sendMessage);
})();


function giveFeedback(){
    SOCKET.emit('typing',USERNAME)
}

function sendMessage(){
    SOCKET.emit('message',{
        userName: USERNAME,
        message: CHAT_REFS.message.value
    })
    CHAT_REFS.message.value = '';
}

SOCKET.on('newuser',function(data){
    CHAT_REFS.feedback.innerHTML = '';
    CHAT_REFS.output.innerHTML += `<p> <strong>` + data + ` joined</strong> </p><br>`; 
})

SOCKET.on('typing', function(data){
    CHAT_REFS.feedback.innerHTML = `<p>  <em>`+ data + ` is typing...</em></p>`;
})

SOCKET.on('message', function(data){
    CHAT_REFS.feedback.innerHTML = '';
    CHAT_REFS.output.innerHTML += `<div class="message"><p> <strong>` + data.userName + `:</strong>`+ data.message + `</p></div><br>`;
})

SOCKET.on('left', function(data){
    CHAT_REFS.output.innerHTML += `<p> <strong>` + data + `left</strong> </p><br>`;
})