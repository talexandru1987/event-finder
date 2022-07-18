const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const searchForm = $("#search-form");

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="text-center text-danger">${message}</div>;`);
};

const handleSignup = async (event) => {
  event.preventDefault();

  const first_name = $("#firstName").val();
  const last_name = $("#lastName").val();
  const user_name = $("#userName").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();
  const profile_img_url = $("#profileImageUrl").val();
  const date_of_birth = $("#dateOfBirth").val();

  if (
    first_name &&
    last_name &&
    user_name &&
    email &&
    password &&
    confirmPassword
  ) {
    if (password === confirmPassword) {
      try {
        const payload = {
          first_name,
          last_name,
          user_name,
          email,
          password,
          confirmPassword,
          profile_img_url,
          date_of_birth,
        };

        console.log(payload);

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

  const email = $("#email").val();
  const password = $("#password").val();

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
        window.location.assign("/");
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

const handleLogout = async () => {
  console.log("logout");
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.assign("/");
    }
  } catch (error) {
    console.log("Failed to logout");
  }
};

const navigateToSearchResults = (event) => {
  event.preventDefault();

  const q = $("#searchInput").val();

  window.location.assign(`/search-events?q=${q}`);
};

signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
searchForm.submit(navigateToSearchResults);
