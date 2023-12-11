// const formModel = require("../../models/User");
function submitForm() {
  const form = document.getElementById("submitForm");
  const formData = new FormData(form);
  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => response.text())
    .then((message) => alert(message))
    .catch((error) => console.error("Error:", error));
}
