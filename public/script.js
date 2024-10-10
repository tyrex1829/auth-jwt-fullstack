import axios from "axios";

// signup function
async function signup() {
  try {
    const username = document.querySelector("#signup-username").value;
    const password = document.querySelector("#signup-password").value;

    if (!username || !password) {
      alert("Please enter both a username and a password.");
      return;
    }

    const response = await axios.post("http://localhost:3001/signup", {
      username: username,
      password: password,
    });
    if (response.status === 201) {
      alert("Successfully Signed up!");
      window.location.href = "/signin";
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert(
      "Signup failed: " + error.response.data.message || "An error occurred"
    );
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

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      alert("Signed in successfully!");

      getUserInformation();
    } else {
      alert("Sign-in failed: " + response.data.message);
    }
  } catch (error) {
    console.error("Signin error:", error);
    alert(
      "An error occurred during sign-in. Please check your credentials and try again."
    );
  }
}
