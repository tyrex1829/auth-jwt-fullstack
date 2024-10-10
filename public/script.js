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

// signin function
async function signin() {
  try {
    const username = document.querySelector("#signin-username").value;
    const password = document.querySelector("#signin-password").value;

    const response = await axios.post("http://localhost:3001/signin", {
      username: username,
      password: password,
    });

    localStorage.setItem("token", response.data.token);

    alert("Signed in successful");
    getUserInformation();
  } catch (error) {
    console.error("Signin error:", error);
  }
}
