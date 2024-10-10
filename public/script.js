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

    localStorage.setItem("token", response.data.token);
    alert("Signed in successfully!");
    window.location.href = "/me";
  } catch (error) {
    console.error("Signin error:", error);
    alert(
      "An error occurred during sign-in. Please check your credentials and try again."
    );
  }
}

// Details of user
async function getUserInformation() {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get("http://localhost:3001/me", {
        headers: {
          Authorization: `${token}`,
        },
      });
      document.querySelector(
        "#information"
      ).innerHTML = ` Hello ${response.data.username}`;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If Unauthorized, redirect to signin page
        alert("Session expired or unauthorized. Please sign in again.");
        window.location.href = "/signin"; // Redirect to signin page
      } else {
        console.error("Error fetching user information:", error);
        alert("Failed to fetch user information.");
      }
    }
  } else {
    // If no token found, redirect to signin page
    alert("No valid session found. Please sign in.");
    window.location.href = "/signin"; // Redirect to signin page
  }
}

// Logout user
async function logout() {
  localStorage.removeItem("token");
  alert("Successfully Signed-out!");
  window.location.href = "/";
}
