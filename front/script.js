const API_URL = "https://my-super-chat-back.onrender.com";

function getAllMsgs() {
  fetch(`${API_URL}/msg/getAll`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    update(data.msgs);
  });
}

function fact(n) {
  if (n === 0) {
    return 1;
  }
  return n * fact(n - 1);
}

function applique(f, tab) {
  return tab.map(f);
}

function update(tab) {
  const messages = document.getElementById("messages");
  messages.innerHTML = "";
  tab.forEach((e) => {
    const li = document.createElement("li");
    li.innerHTML =
      e.username +
      " : " +
      e.msg +
      " <small style='float: right;'>" +
      e.date +
      "</small>";
    messages.appendChild(li);
  });
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");
  const themeButton = document.getElementById("theme-button");
  themeButton.innerHTML = body.classList.contains("dark")
    ? "☀️"
    : "🌙";
}

const postMsg = async (e) => {
  e.preventDefault();
  const msg = document.getElementById("form-textarea").value;
  const username = document.getElementById("form-input").value;
  fetch(`${API_URL}/msg/post/${msg}?username=${username}`)
  .then(() => {
    getAllMsgs()
  });

}

getAllMsgs();