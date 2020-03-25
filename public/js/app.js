console.log("Client side javascript is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault(); // prevent the page form being reloaded every time the form is submitted
  const location = search.value;
  const url = `http://localhost:3000/weather?address=${location}`;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
