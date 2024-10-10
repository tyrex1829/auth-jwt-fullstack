import axios from "axios";

// signup function
async function signup() {
  try {
    const username = document.querySelector("#signup-username").value;
    const password = document.querySelector("#signup-password").value;

    const response = await axios.post("http://localhost:3001/signup", {
      username: username,
      password: password,
    });
    alert("Successfully Signed up!");
  } catch (error) {
    console.error("Signup error:", error);
  }
}
