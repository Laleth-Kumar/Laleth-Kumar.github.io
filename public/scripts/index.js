const URL = "http://localhost:8080";
const LOGIN_REFS = {
  username: document.querySelector(".username-input"),
  submit: document.querySelector(".submit"),
};

//let socket = io.connect(URL);

LOGIN_REFS.submit.addEventListener("click", getUsernameAndJoin);

function getUsernameAndJoin() {
  console.log(LOGIN_REFS.username.value);
  // socket.emit('join',{
  //     username: LOGIN_REFS.username.value
  // })
}
