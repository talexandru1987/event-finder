const signupForm = $("#signup-form");
const loginForm = $("#login-form");

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="text-center text-danger">${message}</div>;`);
};

const handleSignup = async (event) => {
  event.preventDefault();

  const firstName = $("#firstName").val;
  const userName = $("#userName").val;
  const email = $("#email").val;
  const password = $("#password").val;
  const confirmPassword = $("#confirmPassword").val;

  if (firstName && userName && email && password && confirmPassword) {
    if (password === confirmPassword) {
      try {
        const payload = {
          firstName,
          userName,
          email,
          password,
        };

        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          window.location.assign("/login");
        } else {
          renderError(
            "signup-error",
            "Failed to create account. Please try again"
          );
        }
      } catch (error) {
        renderError(
          "signup-error",
          "Failed to create account. Please try again."
        );
      }
    } else {
      renderError("signup-error", "Passwords do not match. Try again.");
      //mismatched passwords
    }
  } else {
    renderError("signup-error", "Please complete all required fields.");
  }

  console.log("submit");
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email").val;
  const password = $("#password").val;

  if (email && password) {
    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        //LOGIN - WHERE DOES IT REDIRECT TO??? SAVED EVENTS? FRIENDS PAGE?
        window.location.assign("");
      } else {
        renderError("login-error", "Failed to login. Please try again");
      }
    } catch (error) {
      renderError("login-error", "Failed to login. Please try again.");
    }
  } else {
    renderError("login-error", "Passwords do not match. Try again.");
  }
};

signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
