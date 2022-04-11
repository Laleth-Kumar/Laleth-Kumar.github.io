const URL = "http://localhost:8080";
const LOGIN_REFS = {
  username: document.querySelector(".username-input"),
  submit: document.querySelector(".submit"),

};
let userName;
export let socket = io.connect(URL);

(function(){
    LOGIN_REFS.submit.addEventListener("click", getUsernameAndJoin);
})()

function getUsernameAndJoin() {
  userName = LOGIN_REFS.username.value;
  socket.emit('newuser',userName)
}